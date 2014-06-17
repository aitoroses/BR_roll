define("Router", [], function(require, exports, module){
	"use strict";

	var _cached = null;
	
	function FamousRouter() {

		if(_cached != null) {return _cached;}
		else {

			var RenderController = require('famous/views/RenderController');

			this._renderController = new RenderController();

			this._routes = {};

			_cached = this;

			this._scene = null;

			return this;
		}
	}

	FamousRouter.constructor = FamousRouter;

	FamousRouter.prototype.setTransitions = function (transitions) {
		if (transitions == null) {return;}

		if(transitions.in != null) {
			this._renderController.setOptions({inTransition: transitions.in});
		}
		if(transitions.out != null) {
			this._renderController.setOptions({outTransition: transitions.out});
		}
	};

	FamousRouter.prototype.renderScene = function(scene) {
		var sceneView = this._routes[scene]();
		this._scene = scene;
		this._renderController.show(sceneView);
		if (sceneView.animation != undefined) {
			sceneView.animation.enter();
		}
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

	FamousRouter.prototype.defaultRoute = function(scene) {
		this._routes["default"] = scene;
	};

	FamousRouter.prototype.init = function() {
		Router.map(function(){

			var Navigation = require("Navigation");
			var navigate = new Navigation();

			var createRoute = function(route) {
			 	this.route(route, {
					path: '/' + route,
					action: function() {
						if (this.ready()){
							navigate.render(route);
						}
					},
					waitOn: [
						function () {
					    	return Meteor.subscribe('Example');
						},
						function () {
					    	return Meteor.subscribe('images');
						},
						function() {
							//return Meteor.subscribe('comments');
						}
					]
				});
			};

			for (var route in navigate._router.getRoutes()) {
				if (route != "default") {
					createRoute.bind(Router,route)();
				}
			}

			// Default route setup
			this.route("/", {
				path: '/',
				action: function() {
					navigate.render("default");
				}
			});
		});
	};

	module.exports = FamousRouter;
});