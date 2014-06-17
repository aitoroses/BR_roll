define("views/videos/VideosControllerView", [], function(require, exports, module) {
	'use strict';

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var RenderController = require('famous/views/RenderController');

    var WordsView = require('views/videos/WordsView');

    // Constructor function for our WordsControllerView class
    function WordsControllerView() {

        // Applies View's constructor function to WordsControllerView class
        View.apply(this, arguments);

        this.ctrl = new RenderController();
        this.mainNode = this.add(this.ctrl);

        _createWords.call(this);
        _createBrandVideo.call(this);
        _createOldVideos.call(this);

    }

    // Establishes prototype chain for WordsControllerView class to inherit from View
    WordsControllerView.prototype = Object.create(View.prototype);
    WordsControllerView.prototype.constructor = WordsControllerView;

    // Default options for WordsControllerView class
    WordsControllerView.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here
    
    function _createWords() {
    	// words instance
    	var words = new WordsView();
    	this.add(words);
    }

    function _createBrandVideo() {
    	// brandVideo instance
    }

    function _createOldVideos() {
    	// oldVideos instance
    }

    module.exports = WordsControllerView;

});
