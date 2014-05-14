define("views/grid/LightboxLayout", [], function(require, exports, module) {
	"use strict";

	var Entity         = require("famous/core/Entity");
	var RenderNode     = require("famous/core/RenderNode");
	var StateModifier  = require('famous/modifiers/StateModifier');
	var lightbox       = require("views/grid/Lightbox");

	

	function LightboxLayout (node, origin) {

		this._entity = Entity.register(this);

		this._context = new RenderNode();
		this._modifiers = [];
		this._nodes = [];       
		this._lightbox = lightbox;
	}

	LightboxLayout.prototype.constructor = LightboxLayout;

	LightboxLayout.prototype._add = function(node, modifier) {
		this._nodes.push(node);
		if(modifier != null) {
			this._modifiers.push(modifier);
			return this._context.add(modifier).add(node);
		} else {
			return this._context.add(node);
		}
	};

	LightboxLayout.prototype.addToOrigin = function(node, origin) {

		var modifier = new StateModifier({
			origin: origin
		});

		function show() {
			lightbox.setOptions({
				inOrigin: origin,
				outOrigin: origin
			});
			lightbox.show(node);
		}

		node.on("click", function() {
			if (lightbox._showing) {
				lightbox.hide();
			} else {
				show();
			}
		});

		this._add(node, modifier);
	};

	LightboxLayout.prototype._addLightbox = (function() {
		var added = false;
		return function() {
			if (!added) {
				added = true;
				this._add(this._lightbox);
			}
		};
	})();

	LightboxLayout.prototype.render = function() {
		this._addLightbox();
		return this._context.render();
	};


	module.exports = LightboxLayout;
});