const express = require("express");
const {
  logger: { logger, requestLogger },
  handlers: { errorHandler, notFoundHandler, createHandler }
} = require("custom-error-exceptions");

const mongoConnector = require("../databases/mongodb/mongoConnector");
const sequelizeConnector = require("../databases/sequelize/sequelizeConnector");

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
  
  choosingDatabase() {
    const { dbConfig: { dialect } } = this.config;
    // const sequelizeSupportDialect = ['mysql', 'mariadb', 'sqlite', 'postgres', 'mssql'];
    if (dialect === 'mongodb') {
      const createMiddleware = mongoConnector(this.app, this.config, logger, this.models);
      this.app.use(createMiddleware);
    } else if (dialect === 'mysql' || dialect === 'mariadb' || dialect === 'sqlite' || dialect === 'postgres' || dialect === 'mssql'){
      sequelizeConnector(this.app, this.config, logger, this.models);
    } else {
      logger.Error('Dialect you\'re choosing ins\'nt supported');
    }
  }

  start() {
    this.choosingDatabase();
    this.app.use(requestLogger);
    this.createRouter();
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
    this.app.listen(this.port, () => {
      logger.info(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = CreateServer;
