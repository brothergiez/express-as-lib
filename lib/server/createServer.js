const express = require('express');

class CreateServer {
    constructor(param = { port: 3000 }) {
        this.port = param.port || 3000;
        this.routers = param.routers;
        this.app = express();
    }

    createRouter() {
        this.routers.map((el) => {
            const method = el.method.toLowerCase();
            this.app[method](el.path, el.handler);
        })
    }

    init() {
        this.createRouter();
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        });

        return this.app;
    }

    
}

module.exports = CreateServer;  