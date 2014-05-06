
// Famous application main logic

Meteor.startup(function(){

  var Engine  = require('famous/core/Engine');

  var login   = require("views/login/LoginView");

  var mainCtx = Engine.createContext();
  
  mainCtx.add(login);

});

