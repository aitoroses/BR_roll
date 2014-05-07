define("views/main/MainScene", [], function(require, exports, module){
	'use strict';

	var Surface 	= require("famous/core/Surface");
	var Scene 		= require("famous/core/Scene");

	var surface = new Surface({
		content: '<div>Hello Lightbox<a href="/lightbox"> [x]</a></div>',
		size: [600, 400],
		properties: {
			fontSize: "60px",
			lineHeight: "400px",
			textAlign: "center"
		}
	});

	var scene = new Scene({
		id: "MainView",
		target: [
			{
				target: {id: "main"},
				origin: [0.5, 0.5]
			}
		]
	});

	scene.id.main.add(surface);

	module.exports = scene;
});