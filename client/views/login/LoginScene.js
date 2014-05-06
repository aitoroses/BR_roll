define("views/login/LoginScene", [], function(require, exports, module){
	'use strict';

	var ContainerSurface 	= require("famous/surfaces/ContainerSurface");
	var Scene 		  		= require("famous/core/Scene");
	var MeteorSurface 		= require("famono/util/Surface");
	var Transform			= require("famous/core/Transform");
	var StateModifier		= require("famous/modifiers/StateModifier");
	var Easing              = require("famous/transitions/Easing");


	var Navigation			= require("Navigation");

	var scene = new Scene({
		id: "login",
		target: [
			{
				target: {id: "background"}

			},
			{
				target: {id: "form"},
				origin: [.5, .5],
				transform: Transform.inFront
			}
		]
	});

	var background = new ContainerSurface({
		classes: ["login-background"]
	});


	var form = new MeteorSurface({
		content: Template.LoginTemplate,
		size: [300, 102],
		events: {
			"click": {
				".sign-in": function() {
					_animateOut(function() {
						// When animation finished go to main
						var navigate = new Navigation();
						navigate.go("main");
					});
				}
			}
		}
	});

	function _animate(transform, opacity, curveOption, callback) {
		var curve = curveOption || {curve: Easing.inSine, duration: 800};
		formModifier.setTransform(transform, curve, callback);
		formModifier.setOpacity(opacity, curve);
	}

	function _animateOut (callback) {
		_animate(Transform.translate(0, 200, 0), 0, null, callback);
	}

	function _animateIn(callback) {
		_animate(Transform.translate(0, 0, 0), 1, null, callback);
	}

	// Initial state
	var formModifier = new StateModifier({
		transform: Transform.translate(0, -200, 0),
		opacity: 0
	});

	scene.id.background.add(background);
	scene.id.form.add(formModifier).add(form);

	scene.animation = {
		enter: _animateIn,
		leave: _animateOut
	};

	module.exports = scene;
	
});