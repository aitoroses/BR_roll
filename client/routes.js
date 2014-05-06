var Navigation = require("Navigation");
var navigate = new Navigation();

Router.map(function(){
	"use strict";

	this.route("login", {
		path: '/login',
		action: function() {
			navigate.go("login");
		}
	});
});