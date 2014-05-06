define("Navigation", [], function(require, exports, module){
	"use strict";

	var _cachedRouter = null;

	var Navigation = function() {

		if (_cachedRouter != null) {this._router = _cachedRouter;}
		else {
			var Router = require("Router");
			this._router = new Router();
			_cachedRouter = this._router;
		}

		Navigation.prototype.go = function(scene) {
			this._router.renderScene(scene);
		};

	};

	Navigation.constructor = Navigation;

	module.exports = Navigation;
});