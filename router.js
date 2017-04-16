/**
 * Created by admin on 4/16/17.
 */
var Router = module.exports = function () {
    this.routes = [];
};

Router.prototype.add = function (method, url, handler) {
    this.routes.push({
        method: method,
        url: url,
        handler: handler
    });
};

Router.prototype.resolve = function (request, response) {
    //the object returned by parse has pathname for file path or query for specific information
    var path = require("url").parse(request.url).pathname;

    return this.routes.some(function (route) {
        //url is a regex
        var match = route.url.exec(path);
        //if the route url or method does not match
        if (!match || route.method != request.method) {
            return false;
        }
        //use decodeURIComponent on the first matched string
        var urlParts = match.slice(1).map(decodeURIComponent);
        //still don't understand why null, the next is to create three elements array
        route.handler.apply(null, [request, response].concat(urlParts));
        //to stop the some function
        return true;
    });
};