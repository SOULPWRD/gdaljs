const gdal = require("./gdal")();

gdal.load(function (image, err) {
   // handle image
   console.log(image.buffer());
}, "./json.gif");

gdal.request(function(image, err) {
    // handle image
    console.log(image.mime())
}, "http://json.org/img/json160.gif")