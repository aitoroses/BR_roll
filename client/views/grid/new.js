// var Engine         = require('famous/core/Engine');
// var Surface        = require('famous/core/Surface');
// var StateModifier  = require('famous/modifiers/StateModifier');
// var Lightbox       = require("famous/views/Lightbox");
// var Transform      = require("famous/core/Transform");
// var Easing         = require("famous/transtions/Easing");

// var mainContext = Engine.createContext();

// var lightboxOptions = {
//   inOpacity: 1,
//   inTransform: Transform.translate(0, 0, 0),
//   inTransition: { duration: 1000, curve: Easing.outBack },
//   inOrigin: [0, 0],
//   outOpacity: 1,
//   outTransform: Transform.translate(0, 0, 0),
//   outOrigin: [0, 0],
//   outTransition: { duration: 400, curve: Easing.outBack },
//   showOpacity: 1,
//   showOrigin: [.5, .5],
//   showTransform: Transform.rotateY(3.14)
// };

// var lightbox = new Lightbox(lightboxOptions);

// function createSurface(origin) {
  
//   var surface = new Surface({
//     size: [150, 150],
//     properties: {
//       lineHeight: "150px",
//       textAlign: "center",
//       backgroundColor: "#DDD",
//       backfaceVisibility: "initial"
//     },
//     content: "Click on me"
//   });
  
//   var modifier = new StateModifier({
//     origin: origin
//   });
    
//   function show() {
//     lightbox.setOptions({
//       inOrigin: origin,
//       outOrigin: origin
//     });
//     lightbox.show(surface);
//   }
  
//   surface.on("click", function() {
//     if (lightbox._showing) {
//       lightbox.hide();
//     } else {
//       show();
//     }
//   });
  
//   mainContext.add(modifier).add(surface);
  
// }
  
// createSurface([0,0]);
// createSurface([0,1]);

// mainContext.add(lightbox);





