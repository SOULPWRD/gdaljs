function init() {
    "use strict";

    const fs = require("fs");
    const http = require("http");
    const https = require("https");
    const path = require("path");
    const raster = require("./raster");

    function gdal(spec = {}) {
        const root_dir = spec.root_dir || __dirname;

        function load(cb, file_path, options = {}) {
            fs.readFile(
                path.join(root_dir, file_path),
                options,
                function (err, file_buffer) {
                    if (err) {
                        cb(undefined, err);
                        return;
                    }

                    const image = raster({
                        buffer: file_buffer
                    });

                    cb(image);
                }
            );
        }

        function request(cb, url) {
            let client_request;

            function handle_error(err) {
                cb(undefined, err);
            }

            function response_listener(response) {
                const {statusCode} = response;
                let error;

                if (statusCode !== 200) {
                    error = new Error(
                        `Request failed. Status code: ${statusCode}`
                    );
                }

                if (error) {
                    response.resume();
                    cb(undefined, error);
                    return;
                }

                const raw_data = [];

                response.on("data", function (chunk) {
                    raw_data.push(chunk);
                });

                response.on("end", function () {
                    const image = raster({
                        buffer: Buffer.concat(raw_data)
                    });

                    cb(image);
                    return;
                });

                response.on("error", handle_error);
            }

            if (url.indexOf("http") === 0) {
                client_request = http.get(url, response_listener);
            }

            if (url.indexOf("https") === 0) {
                client_request = https.get(url, response_listener);
            }

            client_request.on("error", handle_error);
        }

        return Object.freeze({
            load,
            request,
            raster
        });
    }

    return Object.freeze(gdal);
}

module.exports = init();