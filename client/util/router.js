define("Router", [], function(require, exports, module){
	"use strict";

	var FamousRouter = {};
	var RenderController = require('famous/views/RenderController');
	
	var renderController = new RenderController();

	var routes = {};

	function init() {

		var loginScene   = require("views/login/LoginScene");
		var mainScene    = require("views/main/MainScene");

		routes = {
			"login" : loginScene,
			"main"  : mainScene
		};
	}
	

	function renderScene(scene) {
		renderController.show(routes[scene]);
	}

	function view() {
		return renderController;
	}

	FamousRouter.renderScene = renderScene;
	FamousRouter.view = view;
	FamousRouter.init = init;

	module.exports = FamousRouter;
});