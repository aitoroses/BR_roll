// Famous application main logic

Meteor.startup(function(){
  "use strict";

  var Engine  = require('famous/core/Engine');
  var MiniMenu = require('broll/MiniMenu/views/AppView');
  var FamousRouter = require('Router');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Transform = require('famous/core/Transform');

  var mainCtx = Engine.createContext();
  var menuCtx = Engine.createContext();

  var router = new FamousRouter();

  // Create the menu
  var menu = new MiniMenu({
    items: [{
        iconContent: 'content/svg/loginMenuItem.svg',
        backgroundContent: 'content/images/circle.svg',
        action: function() {Router.go('/login')}
    }, {
        iconContent: 'content/svg/entradaMenuItem.svg',
        backgroundContent: 'content/images/circle.svg',
        action: function() {Router.go('/main')}
    }, {
        iconContent: 'content/svg/galleryMenuItem.svg',
        backgroundContent: 'content/images/circle.svg',
        action: function() {Router.go('/gallery')}
    },{
        iconContent: 'content/svg/videosMenuItem.svg',
        backgroundContent: 'content/images/circle.svg',
        action: function() {Router.go('/videos')}
    },{
        iconContent: 'content/svg/commentsMenuItem.svg',
        backgroundContent: 'content/images/circle.svg',
        action: function() {Router.go('/comments')}
    }, {
        iconContent: 'content/svg/oldwebMenuItem.svg',
        backgroundContent: 'content/images/circle.svg',
        action: function() {Router.go('/oldweb')}
    }]
  });

  // Modifier for the menu
  var position = 110
  var menuMod = new StateModifier({
    opacity: 0,
    align: [0,1],
    transform: Transform.translate(position + 20, - position, 2)
  });

  setInterval(function(){
    var r = this;
    var opacity;

    if (r._scene == "default" || r._scene == "login" || r._scene == "main" || r._scene == null) {
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

