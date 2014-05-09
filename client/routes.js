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
// Lightbox Scene
var lightboxScene = function() {
	return require("views/lightbox/LightboxScene");
};
// Grid Scene
var gridScene = function() {
	return require("views/grid/GridScene");
};

router.defaultRoute(loginScene);
router.addRoute("login", loginScene);
router.addRoute("main", mainScene);
router.addRoute("lightbox", lightboxScene);
router.addRoute("grid", gridScene);

router.init();