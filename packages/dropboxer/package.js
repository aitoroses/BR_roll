// var Fiber = Npm.require('fibers');
// var Future = Npm.require('fibers/future');

Package.describe({
  summary: 'Dropbox API Server Integration'
});

Package.on_use(function(api) {
  'use strict';

  api.use('npm');

  api.add_files([
    'dropboxer.js',
  ]);

  api.export('Dropboxer');
});