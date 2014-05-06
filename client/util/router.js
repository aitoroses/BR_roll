define("Router", [], function(require, exports, module){
	"use strict";

	var _cached = null;

	function FamousRouter() {

		if(_cached != null) {return _cached;}
		else {

			var RenderController = require('famous/views/RenderController');
			
			this._renderController = new RenderController();

			this._routes = {};

			// var loginScene   = require("views/login/LoginScene");
			// var mainScene    = require("views/main/MainScene");

			// this._routes = {
			// 	"login" : loginScene,
			// 	"main"  : mainScene
			// };

			_cached = this;

			return this;
		}
	}

	FamousRouter.constructor = FamousRouter;

	FamousRouter.prototype.renderScene = function(scene) {
		this._renderController.show(this._routes[scene]());
	};

	FamousRouter.prototype.view = function() {
		return this._renderController;
	};

	FamousRouter.prototype.getRoutes = function() {
		return this._routes;
	};

	FamousRouter.prototype.addRoute = function(name, scene) {
		this._routes[name] = scene;
	};

	FamousRouter.prototype.init = function() {
		Router.map(function(){

			var Navigation = require("Navigation");
			var navigate = new Navigation();

			var createRoute = function(route) {
			 	this.route(route, {
					path: '/' + route,
					action: function() {
						navigate.go(route);
					}
				});
			};

			for (var route in navigate._router.getRoutes()) {
				createRoute.bind(Router,route)();
			}
		});
	};

	module.exports = FamousRouter;
});