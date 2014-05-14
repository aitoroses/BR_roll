define("views/grid/GridScene", [], function(require, exports, module){
	"use strict";

	var Surface  = require('famous/core/Surface');
	var LightboxLayout = require('views/grid/LightboxLayout');

	var lightboxLayout = new LightboxLayout();

	var props = {
		size: [150, 150],
		properties: {
			lineHeight: "150px",
			textAlign: "center",
			backgroundColor: "#DDD",
			backfaceVisibility: "initial"
		},
		content: "Click on me"
	};
	
	var surface = new Surface(props);

	var surface2 = new Surface(props);

	lightboxLayout.addToOrigin(surface, [.5,0]);
	lightboxLayout.addToOrigin(surface2, [.5,1]);

	module.exports = lightboxLayout;
});