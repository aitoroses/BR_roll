define("views/grid/Lightbox", [], function(require, exports, module) {
	"use strict";
    
    var Transform = require("famous/core/Transform");
    var Lightbox  = require("famous/views/Lightbox");
    var Easing    = require("famous/transitions/Easing");

    var lightboxOptions = {
		inOpacity: 1,
		inTransform: Transform.translate(0, 0, 0),
		inTransition: { duration: 1000, curve: Easing.outBack },
		inOrigin: [0, 0],
		outOpacity: 1,
		outTransform: Transform.translate(0, 0, 0),
		outOrigin: [0, 0],
		outTransition: { duration: 400, curve: Easing.outBack },
		showOpacity: 1,
		showOrigin: [.5, .5],
		showTransform: Transform.rotateY(3.1415)
	};

	var lightbox = new Lightbox(lightboxOptions);

	module.exports = lightbox;
});