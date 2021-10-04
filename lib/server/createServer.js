const express = require("express");
const cors = require("cors");
const {
  logger: { logger, requestLogger },
  handlers: { errorHandler, notFoundHandler, createHandler }
} = require("custom-error-exceptions");

const { databases, defaultCorsOptions } = require('../config/config');

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
    if(this.config && this.config.dbConfig) {
      const { dbConfig: { dialect } } = this.config;
      if (databases.sequelizeSupportDialect.includes(dialect)){
        logger.info(`Using sequelize dialect ${dialect} database`);
        sequelizeConnector(this.app, this.config, logger, this.models);
      } else if (dialect === databases.mongodbDialect) {
        logger.info('Using mongodb database');
        const createMiddleware = mongoConnector(this.app, this.config, logger, this.models);
        this.app.use(createMiddleware);
      } else {
        logger.error('Dialect you\'re choosing ins\'nt supported');
      }
    } else {
      logger.info('No database config found');
    }
  }

  preparationServer() {
    const corsOptions = this.config.corsOptions ? this.config.corsOptions : defaultCorsOptions;
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(corsOptions));
  }

  start() {
    this.preparationServer();
    this.choosingDatabase();
    this.app.use(requestLogger);
    this.createRouter();
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
    const server = this.app.listen(this.port, () => {
      logger.info(`Example app listening at http://localhost:${this.port}`);
    });
    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received.');
      logger.info('Closing http server.');
      server.close(() => {
        logger.info('Http server closed.');
      });
    });
  }
}

module.exports = CreateServer;
