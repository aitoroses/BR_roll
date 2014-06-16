define('views/words/WordsScene', [], function(require, exports, module) {

	var Surface = require('famous/core/Surface');
	var View = require('famous/core/View');

	var words = new Surface({
		size: [undefined, undefined],
		content: _template()
	});

	function _template() {
		return '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="320" HEIGHT="240" id="Words" ALIGN="">' + 
			'<PARAM NAME=movie VALUE="words.swf">' + 
			'<PARAM NAME=quality VALUE=high>' +
			'<PARAM NAME=bgcolor VALUE=#000>' +
			'<EMBED style="width: 100%; height: 100%;" src="words.swf" quality=high bgcolor=#000 WIDTH="320" HEIGHT="240" NAME="words" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>' +
		'</OBJECT>'
	}

	var node = new View();

	module.exports = node.add(words);

});