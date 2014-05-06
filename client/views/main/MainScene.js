define("views/main/MainScene", [], function(require, exports, module){
	'use strict';

	var Surface 	= require("famous/core/Surface");
	var Scene 		= require("famous/core/Scene");

	var scene = new Scene({
		id: "main",
		target: [
			{
				target: {id: "main"}

			}
		]
	});

	var surface = new Surface({
		content: 'Hello World'
	});

	//scene.id.main.add(surface);

	module.exports = surface;
});