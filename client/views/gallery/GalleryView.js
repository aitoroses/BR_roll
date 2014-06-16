define("views/gallery/GalleryView", [], function(require, exports, module){
    
    //var Engine = require('famous/core/Engine');
    var Utility = require('famous/utilities/Utility');
    var RenderNode = require('famous/core/RenderNode');

    var node = new RenderNode();
    
    // import the AppView class using require
    var AppView = require('broll/LightboxGallery/views/AppView');

    // // import SlideData
    // var SlideData = require('broll/LightboxGallery/data/SlideData');
    
    // // Get request to the picasa with callback
    // Utility.loadURL(SlideData.getUrl(), initApp);

    function parseData() {
        var data = Dropboxer.collection.find({}, {sort: {filename: 1}}).fetch();
        return data.map(function(image){
            // return 'data:' + image.mime + ';base64,' + image.data; 
	        return 'http://' + location.hostname + ':3100/dropbox/thumb/' + image.filename;
        });
    }

    initApp(parseData());

    function initApp(data) {
        // parses out reponse data and retrieves array of urls
        //data = SlideData.parse(data);

        // instantiates AppView with our url data
        // random background

        var appView = new AppView({
            backgroundImage: 'content/background/' + ["IMG_1946.jpg"][Math.floor((Math.random() * 1))],
            data : data,
            defaultTopMargin: window.innerHeight / 20
        });

        node.add(appView);
    }

    module.exports = node;
});
  
