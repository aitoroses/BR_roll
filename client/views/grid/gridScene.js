define("views/grid/GridScene", [], function(require, exports, module){
	// "use strict";

	var LightboxGrid     = require("views/grid/LightboxGrid");
	var SurfaceGenerator = require("views/grid/SurfaceGenerator");

	lightboxGrid = new LightboxGrid({dimensions: [2,2]});

	var surfaces = [
		SurfaceGenerator(),
		SurfaceGenerator(),
		SurfaceGenerator(),
		SurfaceGenerator()
	];

	lightboxGrid.sequenceFrom(surfaces);

	module.exports = lightboxGrid;
});