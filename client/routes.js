var Navigation = require("Navigation");


Router.map(function(){
	"use strict";

	this.route("login", {
		path: '/login',
		action: function() {
			var navigate = new Navigation();
			navigate.go("login");
		}
	});

	this.route("main", {
		path: '/main',
		action: function() {
			var navigate = new Navigation();
			navigate.go("main");
		}
	});
});