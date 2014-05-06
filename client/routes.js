var FamousRouter = require("Router");

var router = new FamousRouter();

router.addRoute("login", function() {
	return require("views/login/LoginScene");
});

router.addRoute("main", function() {
	return require("views/main/MainScene");
});

router.init();