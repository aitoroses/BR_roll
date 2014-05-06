// Famous application main logic

Meteor.startup(function(){
  "use strict";

  var Engine  = require('famous/core/Engine');

  var mainCtx = Engine.createContext();

  var Router = require('Router');

  Router.init();
  
  Router.renderScene("login");

  mainCtx.add(Router.view());
});

