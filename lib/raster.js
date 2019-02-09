function init() {
    "use strict";

    const file_type = require("./file-type");

    function raster(spec) {
        const buffer = spec.buffer;
        const {mime, ext} = file_type(buffer);

        return Object.freeze({
            buffer: () => buffer,
            mime: () => mime,
            ext: () => ext
        });
    }

    return Object.freeze(raster);
}

module.exports = init();