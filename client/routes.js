var FamousRouter = require("Router");

var router = new FamousRouter();

// Login Scene
var loginScene = function(){
	return require("views/login/LoginScene");
};
// Main Scene
var mainScene = function() {
	return require("views/main/MainScene");
};

router.defaultRoute(loginScene);
router.addRoute("login", loginScene);
router.addRoute("main", mainScene);

router.init();