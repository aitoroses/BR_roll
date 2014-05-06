define("Router", [], function(require, exports, module){
	"use strict";

	var _cached = null;

	function FamousRouter() {

		if(_cached != null) {return _cached;}
		else {

			var RenderController = require('famous/views/RenderController');
			
			this._renderController = new RenderController();

			this._routes = {};

			var loginScene   = require("views/login/LoginScene");
			var mainScene    = require("views/main/MainScene");

			this._routes = {
				"login" : loginScene,
				"main"  : mainScene
			};

			_cached = this;

			return this;
		}
	}

	FamousRouter.constructor = FamousRouter;

	FamousRouter.prototype.renderScene = function(scene) {
		this._renderController.show(this._routes[scene]);
	};

	FamousRouter.prototype.view = function() {
		return this._renderController;
	};

	FamousRouter.prototype.getRoutes = function() {
		return this._routes;
	};

	module.exports = FamousRouter;
});