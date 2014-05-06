// Famous application main logic

Meteor.startup(function(){
  "use strict";

  var Engine  = require('famous/core/Engine');

  var login   = require("views/login/LoginView");

  var mainCtx = Engine.createContext();
  
  mainCtx.add(login);

});

