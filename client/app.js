// Famous application main logic

Meteor.startup(function(){
  "use strict";

  var Engine  = require('famous/core/Engine');

  var mainCtx = Engine.createContext();

  var Router = require('Router');

  var router = new Router();
  
  //Router.renderScene("login");

  mainCtx.add(router.view());
});

