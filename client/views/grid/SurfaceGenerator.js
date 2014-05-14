define("views/grid/SurfaceGenerator", [], function(require, exports, module) {
	"use strict";

	var Surface = require("famous/core/Surface");

	var props = {
		size: [150, 150],
		properties: {
			lineHeight: "150px",
			textAlign: "center",
			backgroundColor: "#DDD",
			webkitBackfaceVisibility: "initial",
			backfaceVisibility: "initial"
		},
		content: "Click on me"
	};

	function SurfaceGenerator() {
		return new Surface(props);
	}

	module.exports = SurfaceGenerator;

});