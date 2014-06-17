define("views/oldweb/AppView", [], function(require, exports, module){
	var Surface 	= require("famous/core/Surface");
	var Scene 		= require("famous/core/Scene");
	var ImageSurface = require("famous/surfaces/ImageSurface");
	var RenderController = require('famous/views/RenderController');
	var RenderNode = require('famous/core/RenderNode');
	var StateModifier = require('famous/modifiers/StateModifier');

	// Surface
	var surface = new Surface({
		content: '<iframe style="width: 100%; height: 100%;"src="http://ts.foxlab.co:3200/Cumplebollo8.swf"></iframe>'
	});

	module.exports = surface;
});
