define("Navigation", [], function(require, exports, module){
	"use strict";

	var Navigation = function() {

		var _router = require("Router");

		Navigation.prototype.go = function(scene) {
			_router.renderScene(scene);
		};

	};

	Navigation.constructor = Navigation;

	module.exports = Navigation;
});