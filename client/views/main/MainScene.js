define("views/main/MainScene", [], function(require, exports, module){
	'use strict';

	var Surface 	= require("famous/core/Surface");
	var Scene 		= require("famous/core/Scene");
	var ImageSurface = require("famous/surfaces/ImageSurface");
	var RenderController = require('famous/views/RenderController');
	var RenderNode = require('famous/core/RenderNode');
	var StateModifier = require('famous/modifiers/StateModifier');

	var ctrl = new RenderController();

	// Lust image
	var node1 = new RenderNode();
	var surface1 = new ImageSurface({
		content: "content/background/30sec_frase.jpg",
		size: [window.innerHeight, undefined],
	});
	var overlay1 = new Surface({
		size: [undefined, undefined],
		content: '<div style="opacity: 0">Te quiero</div>'
	});
	overlay1.on('click', function() {
		ctrl.show(node2);
	});
	node1.add(new StateModifier({
		origin: [.5, .5]
	})).add(surface1);
	node1.add(overlay1)


	ctrl.show(node1);

	// GIFS
	var gif1 = new ImageSurface({
		content: "content/background/sexys1.gif",
		size: [400, true]
	});
	var gif2 = new ImageSurface({
		content: "content/background/30sec_pastilla.gif",
		size: [400, true]
	});
	var gif3 = new ImageSurface({
		content: "content/background/sexys2.gif",
		size: [400, true]
	});
	var link = new Surface({
		size: [undefined, 300],
		classes: ["wonderful"],
		content: '<p>¿Entramos?<p>',
		properties: {
			fontSize: "100px",
			lineHeight: "100px",
			textAlign: "center"
		}
	});
	link.on('click', function() {
		Router.go('/gallery');
	});

	var node2 = new Scene({
		id: "GifView",
		target: [
			{
				target: {id: "gif1"},
				origin: [0.01, 0.4]
			},{
				target: {id: "gif2"},
				origin: [0.5, 0.4]
			},{
				target: {id: "gif3"},
				origin: [0.99, 0.4]
			},{
				target: {id: "start"},
				origin: [0.5, .8]
			}
		]
	});
	node2.id.start.add(link);
	node2.id.gif1.add(gif1);
	node2.id.gif2.add(gif2);
	node2.id.gif3.add(gif3);

	// // Export
	module.exports = (new RenderNode()).add(new StateModifier({
		origin: [.5,.5]
	})).add(ctrl);
});