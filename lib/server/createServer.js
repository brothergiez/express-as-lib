const express = require('express');
const {
    logger: { logger, requestLogger },
    handlers: { errorHandler, notFoundHandler, createHandler }
} = require('custom-error-exceptions');

class CreateServer {
    constructor(param = { port: 3000 }) {
        this.port = param.port || 3000;
        this.routers = param.routers;
        this.app = express();
    }

    createRouter() {
        this.routers.map((el) => {
            const method = el.method.toLowerCase();
            this.app[method](el.path, createHandler(el.handler));
        })
    }

    start() {
        this.app.use(requestLogger);
        this.createRouter();
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
        this.app.listen(this.port, () => {
            logger.info(`Example app listening at http://localhost:${this.port}`)
        });

        return this.app;
    }
}

module.exports = CreateServer;  