// Famous application main logic

Meteor.startup(function(){
  "use strict";

  var Engine  = require('famous/core/Engine');
  var MiniMenu = require('broll/MiniMenu/views/AppView');
  var Router = require('Router');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform = require('famous/core/Transform');

  var mainCtx = Engine.createContext();
  var menuCtx = Engine.createContext();

  var router = new Router();

  // Create the menu
  var menu = new MiniMenu();

  // Modifier for the menu
  var menuMod = new StateModifier({
    opacity: 0,
    align: [0,1],
    transform: Transform.translate(120, - 100, 0)
  });

  setInterval(function(){
    var r = this;
    var opacity;
    if (r._scene == "login" || r._scene == null) {
      opacity = 0;
    } else {
      opacity = 1;
    }
    // Trigger opacity change
    menuMod.setOpacity(opacity, {duration: 500 ,curve: 'linear'});

  }.bind(router), 500);
  
  // Add the router to the main Context
  mainCtx.add(router.view());

  // Add the menu to the menu context
  menuCtx.add(menuMod).add(menu);

  

  // Main perspective
  mainCtx.setPerspective(500);

});

