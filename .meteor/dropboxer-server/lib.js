
var thunkify = require('thunkify'),
    Dropbox = require('dropbox');

var token = 'gTwwMn7WAaoAAAAAAAATFuIUcjt5Ov9qEJx5CKqvAh8iKxsRJfeM8P15sD9wD2r1';
var client = new Dropbox.Client({
    token: token
});

// Default Callback function
function C(callback) {
    return function(error, data) {
        if (error) {
            return callback(error);  // Something went wrong.
        }
        callback(null, data);
    };
}

function accountInfo(callback) {
    client.getAccountInfo(C(callback));
}
/** Give dropbox account info thunk */
exports.accountInfo = thunkify(accountInfo);

function readdir(dir, callback) {
    client.readdir(dir, C(callback));
}
/** Read a file from file system thunk */
exports.readdir = thunkify(readdir);

function readFile(file, callback) {
    client.readFile(file, {buffer: true}, C(callback));
}
/** Read a file from dropbox thunk */
exports.readFile = thunkify(readFile);

function stat(file, callback) {
    client.stat(file, C(callback));
}
/** Read file file stats from dropbox thunk */
exports.stat = thunkify(stat);
