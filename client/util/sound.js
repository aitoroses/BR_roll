define("Sound", [], function(require,exports,module) {

	var _cached = null;

	function Sound() {

		if (_cached) return _cached;

		// Root directory
		this._root = "/content/songs/";

		// Sound List
		this.sounds = {
			birth :'01. Birth.mp3',
			doOrDie: '09. Do Or Die.mp3'
		}

		// Playing sound
		this.playing = null;
		
		_init.call(this)

	}

	function _init() {
		_cached = this;
	}

	Sound.prototype.load = function(song){
		if (this.playing) this.playing.stop();
		this.playing = new buzz.sound(this._root + this.sounds[song]);
		this.playing.play();
	}

	Sound.prototype.stop = function(){
		if (this.playing) this.playing.stop();
	}

	module.exports = Sound;
});
