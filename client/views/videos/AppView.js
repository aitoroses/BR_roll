define("views/videos/AppView", [], function(require, exports, module) {
	'use strict';

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var VideosControllerView = require('views/videos/VideosControllerView');

    // Constructor function for our AppView class
    function AppView() {

        // Applies View's constructor function to AppView class
        View.apply(this, arguments);

        _createBackground.call(this);
        _createWordsController.call(this);
    }

    // Establishes prototype chain for AppView class to inherit from View
    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    // Default options for AppView class
    AppView.DEFAULT_OPTIONS = {
    	background: '/content/background/paris5.png'
    };

    // Define your helper functions and prototype methods here

    function _createBackground() {
    	var background = new ImageSurface({
    		content: this.options.background,
    		properties: {
    			pointerEvents: 'none'
    		}
    	});
    	
    	this.add(background);
    }

    function _createWordsController() {
    	var videos = new VideosControllerView();
    	var videosModifier = new StateModifier({
    		transform: Transform.translate(0,0,1)
    	});
    	this.add(videosModifier).add(videos);
    }

    module.exports = AppView;

});
