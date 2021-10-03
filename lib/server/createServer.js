const express = require("express");
const {
  logger: { logger, requestLogger },
  handlers: { errorHandler, notFoundHandler, createHandler }
} = require("custom-error-exceptions");

const mongoConnector = require("../databases/mongodb/mongoConnector");

class CreateServer {
  constructor(param) {
    this.port = param.port || 3000;
    this.config = param.config || null;
    this.routers = param.routers;
    this.models = param.models;
    this.app = express();
  }

  createRouter() {
    this.routers.map((el) => {
      const method = el.method.toLowerCase();
      this.app[method](el.path, createHandler(el.handler));
    });
  }

  init() {
    return this.app;
  }

  start() {
    const createMiddleware = mongoConnector(this.app, this.config, logger, this.models);
    this.app.use(requestLogger);
		this.app.use(createMiddleware);
    this.createRouter();
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
    this.app.listen(this.port, () => {
      logger.info(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = CreateServer;
