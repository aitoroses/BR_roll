define("views/gallery/GalleryView", [], function(require, exports, module){
    
    //var Engine = require('famous/core/Engine');
    var Utility = require('famous/utilities/Utility');
    var RenderNode = require('famous/core/RenderNode');

    var node = new RenderNode();
    
    // import the AppView class using require
    var AppView = require('broll/LightboxGallery/views/AppView');

    // import SlideData
    var SlideData = require('broll/LightboxGallery/data/SlideData');
    
    // Get request to the picasa with callback
    Utility.loadURL(SlideData.getUrl(), initApp);

    function initApp(data) {
        // parses out reponse data and retrieves array of urls
        data = SlideData.parse(data);

        // instantiates AppView with our url data
        var appView = new AppView({ data : data });

        node.add(appView);
    }

    module.exports = node;
});
  