define("views/grid/LightboxGrid", [], function(require, exports, module) {
	"use strict";

	var View          = require("famous/core/View");
	// var ViewSequence  = require("famous/core/ViewSequence");
	var StateModifier = require("famous/modifiers/StateModifier");
	var Transform     = require("famous/core/Transform");
	var Scene         = require("famous/core/Scene");

	var LightboxLayout = require("views/grid/LightboxLayout");

	function LightboxGrid(options) {
		View.apply(this, arguments);

		this._layout = new Scene();
		this._modifiers = [];
		this._surfaces = [];
		this._node = null; 
		this._grid = new LightboxLayout();
	}

	LightboxGrid.prototype = Object.create(View.prototype);
	LightboxGrid.prototype.constructor = LightboxGrid;

	LightboxLayout.DEFAULT_OPTIONS = {
		dimensions: [2,2],
		cellSize: [250, 250],
		verticalGutter: 50
	};

	LightboxGrid.prototype.sequenceFrom = function (node) {
		var child = 0;
		var windowSize = [window.innerWidth, window.innerHeight];
		var origin = [0, 0];

		function getNextOrigin() {
			
			origin = [
				origin[0] + 1 / (this.options.dimensions[0] + 1),
				origin[1]
			];
			return origin;
		}

		if (node instanceof Array) {
			node.map(function(surface){
				this._grid.addToOrigin(surface, getNextOrigin.call(this));
				this._surfaces.push(surface);
			}.bind(this));
		}

		this._node = this._grid;
	};


	module.exports = LightboxGrid;
});
