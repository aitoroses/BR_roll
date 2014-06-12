var fs = require('fs');
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
    mount = require('koa-mount');

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
			width: 128,
			height: 128,
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

// GET Benchmark
API.get('/benchmark', function *() {
    var photos =
        [
            'Foto 05-04-14 22 04 48.jpg',
            'Foto 05-04-14 22 06 44.jpg',
            'Foto 11-05-14 21 48 39.jpg',
            'Foto 17-01-14 20 20 57.jpg'
        ];
    photos = photos.concat(photos);
    photos = photos.concat(photos);
    photos = photos.concat(photos);

    // Iteration using a for, sync yield - 85s
    /* for (var i = 0; i < photos.length; i++) {
        var name = photos[i];
        console.log(name, i);
        yield Dropbox.readFile(name);
    } */

    // Iteration using a map, async yield - 11s
    var result = yield photos.map(function(name) {
        return Dropbox.readFile(name);
    });

    for (var i = 0; i < result.length; i++) {
        console.log(photos[i], result[i].slice(0, 20));
    }

    this.body = 'Done. Look console';
});

app.use(mount('/dropbox', API.middleware()));

// Listen
app.listen(3100);
