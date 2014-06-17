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
var galleryScene = function() {
	return require("views/gallery/GalleryView");
};

// Videos
var videos = function() {
	return require("views/videos/Scene");
};

// Comments
var comments = function() {
	return require("views/comments/AppView");
};

// Words
var words = function() {
	return require('views/words/WordsScene');
}

// Old web
var oldweb = function() {
	return require('views/oldweb/AppView');
}

router.defaultRoute(loginScene);
router.addRoute("login", loginScene);
router.addRoute("words", words);
router.addRoute("main", mainScene);
router.addRoute("videos", videos);
router.addRoute("gallery", galleryScene);
router.addRoute("comments", comments);
router.addRoute("oldweb", oldweb);

router.init();