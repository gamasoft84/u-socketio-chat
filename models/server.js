const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockects');


class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, { /* Configs */ });
    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    configSockets() {
        const sockets = new Sockets(this.io);
    }

    execute() {
        this.middlewares();
        this.configSockets();
        this.app.listen(this.port, () => {
            console.log('corriendo en puerto', this.port);
        });
    }

}

module.exports = Server