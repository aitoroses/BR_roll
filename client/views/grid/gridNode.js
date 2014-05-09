define("views/grid/GridNode", [], function(require, exports, module) {
	"use strict";

	var Surface          = require("famous/core/Surface");
	var Lightbox         = require("famous/views/Lightbox");
	var Transform        = require("famous/core/Transform");
	var Easing           = require("famous/transitions/Easing");
	var StateModifier    = require("famous/modifiers/StateModifier");
	var RenderNode       = require("famous/core/RenderNode");
	var GridLayout       = require("famous/views/GridLayout");


	function createSurface(origin) {

	  var lightboxOptions = {
	    inOpacity: 1,
			inTransform: Transform.translate(0, 0, 0),
			inTransition: { duration: 400, curve: Easing.outBack },
			inOrigin: [0,0],
			outOpacity: 1,
			outTransform: Transform.translate(0, 0, 0),
			outOrigin: [0,0],
			outTransition: { duration: 250, curve: Easing.outBack },
			showOpacity: 1,
			showOrigin: [.5, .5],
			showTransform: Transform.skew(0,0,0.5)
		};

		var modifier = new StateModifier();

		// custom
		if (origin !== undefined) {
			lightboxOptions.inOrigin  = origin;
			lightboxOptions.outOrigin = origin;
			modifier.setOrigin(origin);
		}

		var node = new RenderNode();

		var surface = new Surface({
			size: [150, 150],
			properties: {
				lineHeight: "150px",
				textAlign: "center",
				backgroundColor: "#DDD"
			},
			content: "Click on me"
		});
	  
		var lightbox = new Lightbox(lightboxOptions);

		surface.on("click", function() {
			if (lightbox._showing) {
				lightbox.hide();
			} else {
				lightbox.show(this);
			}
		});

		node.add(modifier).add(surface);
		node.add(lightbox);

		return node;
	}

	var surfaces = [];

	for (var i = 0; i < 16; i++) {
		surfaces.push(createSurface());
	}

	var grid = new GridLayout({dimensions: [4,4]});
	grid.sequenceFrom(surfaces);

	module.exports = grid;
});