const Sequelize = require("sequelize");
const generatedModels = require("../../models/sequelizeModel/generatedSqlModel");
const SequelizeBaseModel = require("../../models/sequelizeModel/sequelizeBaseModel");

const _connectDB = (app, config, logger) => {
  const { host, port, dialect, pool, database, username, password } = config;
  logger.info(`connecting to database`);
  const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect,
    pool
  });
  sequelize
    .authenticate()
    .then(() => {
      logger.info("Connection has been established successfully.");
    })
    .catch((err) => {
      logger.error("Unable to connect to the database:", err);
    });
  app.locals.db = sequelize;
  return sequelize;
};

const _createModels = (db, models) => {
  return models.map((model) => {
    model.generatedModel = generatedModels(db, model);
    return model;
  });
};

const _generatingConnector = (db, res, models) => {
  models.forEach((model) => {
    if (model.model) {
      res.locals[model.name] = new model.model({
        db,
        table: model.generatedModel
      });
    }else{
      res.locals[model.name] = new SequelizeBaseModel({
        db,
        table: model.generatedModel
      });

    }
  });
};

const startSequelizeConnector = (app, config, logger, models) => {
  const { dbConfig } = config;
  const db = _connectDB(app, dbConfig, logger);
  app.use(async (req, res, next) => {
    res.locals.database = db;
    const model = _createModels(db, models);
    _generatingConnector(db, res, model);
    next();
  });
};

module.exports = startSequelizeConnector;
