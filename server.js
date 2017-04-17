/**
 * Created by admin on 4/17/17.
 */
var http = require("http");
var Router = require("./router");
var ecstatic = require("ecstatic");

//where to look for files
var fileServer = ecstatic({root: "./public"});
var router = new Router();

http.createServer(function (request, response) {
    if (!router.resolve(request, response)) {
        fileServer(request, response);
    }
}).listen(8000);

function respond(response, status, data, type) {
    response.writeHead(status, {
        "Content-Type": type || "text/plain"
    });
    response.end(data);
};

function respondJSON(response, status, data) {
    response(response, status, JSON.stringify(data), "application/json");
}

var talks = Object.create(null);

router.add("GET", /^\/talks\/([^\/]+)$/, function (request, response, title) {
    if (title in talks) {
        respondJSON(response, 200, talks[title]);
    } else {
        respond(response, 404, "No talk " + title + " found");
    }
});

router.add("DELETE", /^\/talks\/([^\/]+)$/, function (resquest, response, title) {

});