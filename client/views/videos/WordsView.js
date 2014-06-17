define("views/videos/WordsView", [], function(require, exports, module) {
    'use strict';

    // Import additional modules to be used in this view
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var RenderController = require('famous/views/RenderController');
    var RenderNode = require('famous/core/RenderNode');

    var WritingView = require('views/videos/WritingView');
    var WritingData = require('views/videos/WritingData');

    // Constructor function for our WordsView class
    function WordsView() {

        // Applies View's constructor function to WordsView class
        View.apply(this, arguments);

        this.index = 0;

        this.writings = [];

        _createWritingViews.call(this);
    }

    // Establishes prototype chain for WordsView class to inherit from View
    WordsView.prototype = Object.create(View.prototype);
    WordsView.prototype.constructor = WordsView;

    // Default options for WordsView class
    WordsView.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here

    WordsView.prototype.show = function() {
    	var num = this.index > this.writings.length ? this.writings.length : this.index;
    	this._controller.show(this.writings[this.index]);
    }

    function _createWritingViews() {
    	
    	// Create a view controller
    	this._controller = new RenderController();
    	
    	// Create the writing views
    	WritingData.map(function(writing) {
    		var write = new WritingView({
    			content: writing
    		});xz
    		this.writings.push(write);
    	}.bind(this));

    	// Overlay
    	var overlay = new Surface({
    		size: [400,400],
    		properties: {
    			cursor: 'pointer'
    		}
    	});
    	var overlayMod = new StateModifier({
    		origin: [.5,.5],
    		transform: Transform.translate(0,0,1)
    	});
    	overlay.on('click', function() {
    		this.index += 1;
    		this.show()
	    }.bind(this));

    	
    	// Show the first and add it to the context
    	this.show();
    	this.add(this._controller);
    	this.add(overlayMod).add(overlay);
    }

    module.exports = WordsView;
});
