/*property
    every, exports, ext, freeze, mime
*/

function init() {
    "use strict";

    function file_type(buffer) {
        // inspect function
        function inspect(header) {
            const result = header.every(function (record, index) {
                return buffer[index] === record;
            });

            return result;
        }

        // png
        if (
            inspect([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]) === true
        ) {
            return Object.freeze({
                mime: "image/png",
                ext: "png"
            });
        }

        // jpg
        if (inspect([0xFF, 0xD8, 0xFF]) === true) {
            return Object.freeze({
                mime: "image/jpeg",
                ext: "jpg"
            });
        }

        // gif
        if (inspect([0x47, 0x49, 0x46]) === true) {
            return Object.freeze({
                mime: "image/gif",
                ext: "gif"
            });
        }

        // tiff
        if (
            inspect([0x49, 0x49, 0x2A, 0x0]) === true ||
            inspect([0x4D, 0x4D, 0x0, 0x2A]) === true
        ) {
            return Object.freeze({
                mime: "image/tif",
                ext: "gif"
            });
        }

        //bmp
        if (inspect([0x42, 0x4D]) === true) {
            return Object.freeze({
                mime: "image/bmp",
                ext: "bmp"
            });
        }
        // todo handle fallback return type
    }

    return Object.freeze(file_type);
}

module.exports = init();