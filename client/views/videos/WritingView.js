/*** WritingView ***/

// define this module in Require.JS
define('views/videos/WritingView', [], function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    // Constructor function for our WritingView class
    function WritingView() {

        // Applies View's constructor function to WritingView class
        View.apply(this, arguments);

        _createContent.call(this);
    }

    // Establishes prototype chain for WritingView class to inherit from View
    WritingView.prototype = Object.create(View.prototype);
    WritingView.prototype.constructor = WritingView;

    // Default options for WritingView class
    WritingView.DEFAULT_OPTIONS = {
        content: 'Default content',
        size: [200, 200],
        lineHeight: undefined,
        fontSize: '42px',
        classes: ['wonderful'],
        velocity: 0.05
    };

    // Define your helper functions and prototype methods here

    function _createContent() {
        var surface = new Surface({
            size: this.options.size,
            classes: this.options.classes,
            properties: {
                textAlign: 'center',
                lineHeight: this.options.lineHeight,
                // lineHeight: this.options.lineHeight || (this.options.size[1] + "px"),
                fontSize: this.options.fontSize,
                pointerEvents: 'none'
            }
        });

        // Content generator
        function _generator() {
            var content = this.options.content;
            var char = 0;
            return function() {
                if (char > content.length) {
                    clearInterval(inter);
                    return content;
                }
                return content.substr(0,char++);
            }
        }
        var content = _generator.call(this);
        var inter = setInterval(function(){
            surface.setContent(content());
        },this.options.velocity * 1000);

        var mod = new StateModifier({
            origin: [.5, .5],
            align: [.5, .5]
        });
        this.add(mod).add(surface);
    }

    module.exports = WritingView;
});
