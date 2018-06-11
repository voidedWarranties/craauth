const app = require("../app");
var debug = require("debug")("mean-app:server");
var http = require("http");

if(process.env.NODE_ENV === "production") {
    var port = normalizePort(process.env.port || "3000");
} else {
    var port = normalizePort(process.env.port || "3001")
}

var server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if(error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string"
        ? "Pipe"  + port
        : "Port " + port;

    switch(error.code) {
        case "EACCES":
            console.error(bind + " requires elevated priveleges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string"
        ? "Pipe " + addr
        : "Port " + addr.port;
    debug("Listening on " + bind);
}