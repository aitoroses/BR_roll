/* Minimenu example */

define('broll/MiniMenu/index', [], function(require, exports, module) {
	var Engine = require('famous/core/Engine');

	var MiniMenu = require('broll/MiniMenu/views/AppView');

	var menu = new MiniMenu();

	var mainContext = Engine.createContext();
	mainContext.add(menu);
});
