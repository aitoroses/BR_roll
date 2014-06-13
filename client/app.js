// Famous application main logic

Meteor.startup(function(){
  "use strict";

  var Engine  = require('famous/core/Engine');
  var MiniMenu = require('broll/MiniMenu/views/AppView');
  var Router = require('Router');

  var mainCtx = Engine.createContext();

  var router = new Router();

  var menu = new MiniMenu();

  router.add(menu);
  
  mainCtx.add(router.view());
  
  mainCtx.setPerspective(500);
});

