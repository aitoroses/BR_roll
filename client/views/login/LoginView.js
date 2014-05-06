define("views/login/LoginView", function(require, exports, module){
	'use strict';

	var ContainerSurface 	= require("famous/surfaces/ContainerSurface");
	var Scene 		  		= require("famous/core/Scene");
	var MeteorSurface 		= require("famono/util/Surface");

	var scene = new Scene({
		id: "login",
		target: [
			{
				target: {id: "background"}

			},
			{
				target: {id: "form"},
				origin: [.5, .5]
			}
		]
	});

	var background = new ContainerSurface({
		classes: ["login-background"]
	});


	var form = new MeteorSurface({
		content: Template.LoginTemplate,
		size: [300, 102]
		// rendered: function(tmpl) {
		// 	tmpl.find("button").click(function(e){
		// 		e.preventDefault();
		// 		console.log("Prevented default");
		// 	});
		// }
	});

	form.on("click", function(e) {
		e.preventDefault();
		console.log(e);
	});

	scene.id.background.add(background);
	scene.id.form.add(form);

	module.exports = scene;
});