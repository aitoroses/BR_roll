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

// GET cached file
API.get('/cache/create', function *() {
    var path = this.query.path || '/';
    var cachepath = path.join(__dirname,'cache');
    var files = yield Dropbox.readdir(path);
    files = files.filter(function(file){
        return file.match('jpg') || file.match('png');
    });
    var thunks = files.map(function(filename) {
        return Dropbox.readFile(path.join(path,filename));
    });
    this.body = yield thunks;
});

// GET generate thumbs
API.get('/cache', function *() {
    var cachepath = path.join(__dirname,'cache');
    var files = fs.readdirSync(cachepath);
    files = files.filter(function(file){
        return file.match('jpg') || file.match('png');
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
        return file.match('jpg') || file.match('png');
    });
    var result = [];
    for (var i = (files.length - 1); i >= 0; i--) {
        console.log(path.join(cachepath,'thumb',filename));
        var res = yield thumbnail({
            src: path.join(cachepath,filename),
            dst: path.join(cachepath,'thumb',filename),
            width: 512,
            height: 512,
            x: 0,
            y: 0
        });
        result.push(res);
    };
    this.body = result;

});

// GET generate thumbs
API.get('/thumbs', function *() {
    var cachepath = path.join(__dirname,'cache','thumb');
    var files = fs.readdirSync(cachepath);
    this.body = files;
});

app.use(mount('/dropbox', API.middleware()));

// Listen
app.listen(3100);
