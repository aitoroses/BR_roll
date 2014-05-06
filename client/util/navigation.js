define("Navigation", [], function(require, exports, module){
	"use strict";

	var _cachedRouter = null;

	var Navigation = function() {

		if (_cachedRouter != null) {this._router = _cachedRouter;}
		else {
			var RouterFamous = require("Router");
			this._router = new RouterFamous();
			_cachedRouter = this._router;
		}

	};

	Navigation.constructor = Navigation;

	Navigation.prototype.go = function(scene) {
		Router.go("/" + scene);
	};

	Navigation.prototype.render = function(scene) {
		this._router.renderScene(scene);
	};


	module.exports = Navigation;
});