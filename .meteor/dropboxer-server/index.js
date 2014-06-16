var fs = require('fs');
var format = require('util').format;
var path = require('path');
var mime = require('mime');
var thunkify = require('thunkify');
var fsstat = thunkify(fs.stat);
var fsWriteFile = thunkify(fs.writeFile);
var fsReadFile = thunkify(fs.readFile);
var easyimg = require('easyimage');
var thumbnail = thunkify(easyimg.thumbnail);

var koa = require('koa'),
    etag = require('koa-etag'),
    Router = require('koa-router'),
    mount = require('koa-mount'),
    co = require('co');

// Custom Dropbox library
var Dropbox = require('./lib');

// Iniciar Koa
var app = koa();

/* Logger */
app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms + 'ms');
});

app.use(etag());

var API = new Router();

// GET accountInfo
API.get('/accountInfo', function *() {
    this.body = yield Dropbox.accountInfo();
});

// GET Dir list
API.get('/list', function *() {
    var path = this.query.path || '/';
    this.body = yield Dropbox.readdir(path);
});

// GET File stat
API.get('/stat/:filename', function *() {
    var pathname = this.query.path || '/';
    var filename = this.params['filename'];
    this.body = yield Dropbox.stat(path.join(pathname,filename));
});

// GET File API
API.get('/file/:filename', function *() {

    var pathname = this.query.path || '/'; 
    var filename = this.params['filename'],
        mimeType = 'image/jpeg';

    // path
    var cachePath = __dirname + '/cache/' + filename;
    console.log(path.join(pathname,filename));

    // Read from cache
    try {
        var fileStat = yield fsstat(cachePath);
        var file = yield fsReadFile(cachePath);
        if (file == null) {throw new Error('Not file found.')}
        this.body = new Buffer(file, 'binary').toString('base64');
    } catch (e) {
        // It's not present in cache, so load from Dropbox and cache the file
        try {
            var stat = yield Dropbox.stat(path.join(pathname,filename));
            mimeType = stat.mimeType;
        } catch (e) {
            this.body = e; return;
        }
        var dfile = yield Dropbox.readFile(path.join(pathname,filename));
        yield fsWriteFile(cachePath, dfile);
        this.body = new Buffer(dfile, 'binary').toString('base64');
    }

    // Set headers
    this.set('Content-Length', this.body.length);
    this.set('Content-Type', mimeType);
    this.set('Content-Disposition', 'attachment; filename=' + filename);

});

// GET cached file
API.get('/cache/:filename', function *() {
	var filename = this.params['filename'];
	console.log("Asking for filename " + filename);  
        var fullpath = path.join(__dirname,'cache', filename);
	console.log('Cached file path: ' + fullpath);
	var stat = yield fsstat(fullpath);
	stat.isFile() ? console.log("File found.") : console.log("File not found.");
	var file = yield fsReadFile(fullpath);
	var type = mime.lookup(fullpath);
	this.body = file;
	this.set('Content-Type', type);
    this.set('Content-Length', this.body.length);
});

// GET cached file
API.get('/caches/create', function *() {
    var pathname = this.query.path || '/';
    var cachepath = path.join(__dirname,'cache');
    var files = yield Dropbox.readdir(pathname);
    files = files.filter(function(file){
        return file.toLowerCase().match('jpg') || file.match('png');
    });
    var thunks = [];
    for (var i = files.length - 1; i >= 0; i--) {
        var filename = files[i];
        try {
            var stat = yield fsstat(path.join(cachepath, filename));
            //console.log('%s already exists.', filename);
        } catch (e) {
            console.log('Synchronizing %s from dropbox.', filename);
            var process = function(filename) {
                return function(callback) {
                    Dropbox.readFile(path.join(pathname,filename))(function(err, dropfile) {
                        fsWriteFile(path.join(cachepath, filename), dropfile)(callback);
                    });
                }
            }
            thunks.push(process(filename));
        }
    };
    try {
        console.log('Proceeding to synchronize the files from dropbox');
        // Save the files
        var fileNum = thunks.length;
        var processing = [];
        while (thunks.length > 0) {
            var taken = 0;
            while (taken < 12) {
                // take loop
                var thunk = thunks.shift();
                if (thunk) {
                    processing.push(thunk);
                    taken++;
                } else { break; }
            }
            console.log("Processed " + (1 - thunks.length / fileNum) * 100 + '%');
            yield processing;
            taken = 0;
            processing = [];
        }
        yield processing;
        this.body = files; 
    } catch (e) {
        console.log('Error getting the files from dropbox');
        console.log(e)
        this.body = e;
    }
});

// GET list cache files
API.get('/cache', function *() {
    var cachepath = path.join(__dirname,'cache');
    var files = fs.readdirSync(cachepath);
    files = files.filter(function(file){
        return file.toLowerCase().match('jpg') || file.match('png');
    });
    this.body = files;
});

// GET cached image thumb
API.get('/thumb/:filename', function *() {
	if (typeof this.header["if-none-match"] == "string") {
                this.status = 304;
                return;
        }
	var filename = this.params['filename'];
    var fullpath = path.join(__dirname,'cache', filename);
	var thumbpath = fullpath.replace('cache', 'cache/thumb');
	try {
        	var stat = yield fsstat(thumbpath);
	} catch (e) {
       		var file = yield fsReadFile(fullpath);
       		var type = mime.lookup(fullpath);
		// Crop the file
		yield thumbnail({
			src: fullpath,
			dst: path.join(__dirname, 'cache', 'thumb', filename),
			width: 512,
			height: 512,
			x: 0,
			y: 0
		});
	}
        var file = yield fsReadFile(thumbpath);
        var type = mime.lookup(thumbpath);
        this.body = file;
        this.set('Content-Type', type);
        this.set('Content-Length', this.body.length);
});

// GET generate thumbs
API.get('/thumbs/create', function *() {
    var cachepath = path.join(__dirname,'cache');
    var files = fs.readdirSync(cachepath);
    files = files.filter(function(file){
        return file.toLowerCase().match('jpg') || file.match('png');
    });
    var result = [];
    for (var i = (files.length - 1); i >= 0; i--) {
        var filename = files[i];
        try {
            var stat = yield fsstat(path.join(cachepath,'thumb',filename));
            //console.log("file %s exists.", filename);
        } catch (e) {
            try {
                console.log('Generating thumb for %s', filename);
                var res = yield thumbnail({
                    src: path.join(cachepath,filename),
                    dst: path.join(cachepath,'thumb',filename),
                    width: 512,
                    height: 512,
                    x: 0,
                    y: 0
                });
                result.push(res);
            } catch (e) {
                console.log("Error generating thumb for " + filename);
            }
        }
    };
    this.body = result;

});

// GET list thumbs
API.get('/thumbs', function *() {
    var cachepath = path.join(__dirname,'cache','thumb');
    var files = fs.readdirSync(cachepath);
    this.body = files;
});

// GET sync images with meteor collection
API.get('/sync/images', function *(){
    var path = this.query.path || '/';
    var collectionArg = this.query.collection || "images";
    var clean = this.query.clean;

    var files;
    try {
     files = yield Dropbox.readdir(path);
    } catch (e) {
        console.log("Error reading dir.")
        return;
    }

    var monk = require('monk');
    var wrap = require('co-monk');
    var db = monk('localhost');

    var collection = wrap(db.get(collectionArg));

    if (clean == "true") {collection.remove({})}

    var index = 1;
    files.forEach(function(image){
        collection.insert({
            filename: image,
            index: index++,
            date: new Date
        });
    });

    this.body = format("Synched! %s to %s", path, collectionArg);
});

API.get('/comments/create', function *(){
    var pathname = this.query.path || '/';
    var files;
    try {
     files = yield Dropbox.readdir(pathname);
    } catch (e) {
        console.log("Error reading dir.")
        return;
    }
    var json = {};
    files.forEach(function(image){
         json[image] = "";
    });
    var savepath = path.join(__dirname, "comments.json");
    console.log("Saving to %s", savepath);
    this.body = yield fsWriteFile(savepath, JSON.stringify(json, null, 4));
})

API.get('/sync/comments', function *(){
    var monk = require('monk');
    var wrap = require('co-monk');
    var db = monk('localhost');

    var comments = require('./comments.json');
    var images = wrap(db.get('images'));

    var foundImages = yield images.find({});
    foundImages.forEach(function (image) {
        co(function *(){
            var res = yield images.updateById(image._id, {$set: {comment: comments[image.filename]}});
            console.log(res);
        })();
    });
    this.status = 200;
});

app.use(mount('/dropbox', API.middleware()));

// Listen
app.listen(3100);
