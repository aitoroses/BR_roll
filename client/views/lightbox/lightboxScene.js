define("views/lightbox/LightboxScene", [], function(require, exports, module){
	'use strict';

	var Surface          = require("famous/core/Surface");
	var Scene            = require("famous/core/Scene");
	var Lightbox         = require("famous/views/Lightbox");
	var Transform        = require("famous/core/Transform");
	var Easing           = require("famous/transitions/Easing");
	var StateModifier    = require('famous/modifiers/StateModifier');
	//var GridLayout  = require("famous/views/GridLayout");



	function createSurface(origin, anchor) {

		var lightboxOptions = {
			inOpacity: 1,
			inTransform: Transform.translate(0, 0, 0),
			inTransition: { duration: 400, curve: Easing.outBack },
			inOrigin: origin,
			outOpacity: 1,
			outTransform: Transform.translate(0, 0, 0),
			outOrigin: origin,
			outTransition: { duration: 250, curve: Easing.outBack },
			showOpacity: 1,
			showOrigin: [.5, .5],
			showTransform: Transform.translate(0,0, 200)
		};

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

		anchor.add(new StateModifier({
			origin: origin
		})).add(surface);

		anchor.add(lightbox);
	}

	var scene = new Scene({
		id: "Lightbox",
		target: [
		{
			target: {id: "main"}
		}
		]
	});
	
	var anchor = scene.id.main;

	createSurface([0,0], anchor);
	createSurface([1,0], anchor);
	createSurface([0,1], anchor);
	createSurface([1,1], anchor);

	module.exports = scene;

});