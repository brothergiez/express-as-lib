const express = require("express");
const cors = require("cors");
const {
  logger: { logger, requestLogger },
  handlers: { errorHandler, notFoundHandler, createHandler },
} = require("custom-error-exceptions");

const { databases, defaultCorsOptions } = require("../config/config");

const mongoConnector = require("../databases/mongodb/mongoConnector");
const sequelizeConnector = require("../databases/sequelize/sequelizeConnector");

class CreateServer {
  constructor(param = {}) {
    this.port = param.port || 3000;
    this.config = param.config || null;
    this.routers = param.routers;
    this.models = param.models;
    this.app = express();
    this.server;
  }

  createRouter() {
    if (!this.routers) {
      this.routers = [
        {
          path: "/",
          method: "GET",
          handler: (req, res) => {
            const message = "Hello world";
            res.send(message);
          },
        },
      ];
    }
    this.routers.map((el) => {
      const method = el.method.toLowerCase();
      this.app[method](el.path, createHandler(el.handler));
    });
  }

  choosingDatabase() {
    if (this.config && this.config.dbConfig) {
      const {
        dbConfig: { dialect },
      } = this.config;
      if (databases.sequelizeSupportDialect.includes(dialect)) {
        logger.info(`Using sequelize dialect ${dialect} database`);
        sequelizeConnector(this.app, this.config, logger, this.models);
      } else if (dialect === databases.mongodbDialect) {
        logger.info("Using mongodb database");
        const createMiddleware = mongoConnector(
          this.app,
          this.config,
          logger,
          this.models
        );
        this.app.use(createMiddleware);
      } else {
        logger.error("Dialect you're choosing ins'nt supported");
      }
    } else {
      logger.info("No database config found");
    }
  }

  init() {
    return this.app;
  }

  preparationServer() {
    const corsOptions = this.config.corsOptions
      ? this.config.corsOptions
      : defaultCorsOptions;
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(corsOptions));
    this.choosingDatabase();
    this.app.use(requestLogger);
    this.createRouter();
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
    return this.app;
  }

  start() {
    this.preparationServer();
    this.server = this.app.listen(this.port, () => {
      logger.info(`Example app listening at http://localhost:${this.port}`);
    });

    process.on("SIGTERM", () => this.stop(this.server));
    process.on("SIGINT", () => this.stop(this.server));
  }

  stop() {
    let connections = [];
    this.server.on("connection", (connection) => {
      connections.push(connection);
      connection.on(
        "close",
        () => (connections = connections.filter((curr) => curr !== connection))
      );
    });

    logger.info("SIGTERM signal received.");
    logger.info("Closing http server.");

    this.server.close(() => {
      logger.info("Http server closed.");
      process.exit(0);
    });

    setTimeout(() => {
      logger.error(
        "Could not close connections in time, forcefully shutting down"
      );
      process.exit(1);
    }, 10000);

    connections.forEach((curr) => curr.end());
    setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
  }
}

module.exports = CreateServer;
