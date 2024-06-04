var http = require("http");
var fs = require("fs");
const path = require('path');


var server = http.createServer(function(request, response) {
    if (request.url == '/') {
        fs.readFile(path.join(__dirname, 'login.html'), (err, data) => {
            if (err) {
                console.error("Error reading login.html:", err);
                response.writeHead(404);
                response.write("File not found");
                response.end();
            } else {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(data);
                response.end();
            }
        });
    } else if (request.url == '/dress') {
        fs.readFile(path.join(__dirname, 'dress.html'), (err, data) => {
            if (err) {
                console.error("Error reading dress.html:", err);
                response.writeHead(404);
                response.write("File not found");
                response.end();
            } else {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(data);
                response.end();
            }
        });
    }else if (request.url.match(/^\/(images\/)?[^\/]+\.(png|jpg|jpeg|gif)$/i)) { // Regular expression for image paths
        serveImage(request.url, response);
      } else {
        response.writeHead(404);
        response.write("<h1>Invalid response</h1>");
        response.end();
    }
});

function serveImage(request,response)
{
        var imagePath = path.join(__dirname,request);
        var fileStream = fs.createReadStream(imagePath);
        response.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(response);
}
server.listen(3001);

console.log("Server is running at localhost:3001");