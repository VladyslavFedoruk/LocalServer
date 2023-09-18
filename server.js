const {
    createServer
} = require("node:http");
const {
    readFile
} = require("node:fs");
const {
    extname
} = require("node:path");

const server = createServer(function (request, response) {
    console.log("request ", request.url);

    let filePath = "." + request.url;
    if (filePath == "./") {
        filePath = "./index.html";
    }

    const ext = extname(filePath).toLowerCase();
    const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".wav": "audio/wav",
        ".mp4": "video/mp4",
        ".woff": "application/font-woff",
        ".ttf": "application/font-ttf",
        ".eot": "application/vnd.ms-fontobject",
        ".otf": "application/font-otf",
        ".wasm": "application/wasm",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";

    readFile(filePath, function (error, content) {
        if (error) {
            if (error.code == "ENOENT") {
                readFile("./404.html", function (error, content) {
                    response.writeHead(404, {
                        "Content-Type": "text/html"
                    });
                    response.end(content, "utf-8");
                });
            } else {
                response.writeHead(500);
                response.end(
                    "Sorry, check with the site admin for error: " +
                    error.code +
                    " ..\n"
                );
            }
        } else {
            response.writeHead(200, {
                "Content-Type": contentType
            });
            response.end(content, "utf-8");
        }
    });
});

const PORT = process.env.PORT || 2000;
server.listen(PORT);
console.log(`Server running at http://localhost:${PORT}/`);