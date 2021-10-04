const mongodb = require("mongodb");
const GeneratedMongoModel = require("../../models/mongoModel/generatedMongoModel");

const _createConnectionString = (dbConfig) => {
  const { instances, options, database, username, password } = dbConfig;
  const encodedPassword = encodeURIComponent(password);

  let connectionString = `mongodb://${instances}/${database}`;
  if (username && password) {
    const creds = `${username}:${encodedPassword}`;
    connectionString = `mongodb://${creds}@${instances}/${database}`;
  }
  return options ? `${connectionString}?${options}` : connectionString;
};

const _connectDb = async (mongodb, dbConfig, logger) => {
  const { MongoClient } = mongodb;
  const connectionString = _createConnectionString(dbConfig);
  logger.info(`connecting to: ${connectionString}...`);
  const client = await MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  if (client) {
    logger.info("database connected");
  }
  return {
    db: client.db(dbConfig.database),
    client,
  };
};

const _dbConnector = async (app, mongodb, dbConfig, logger) => {
  app.locals.mongo = await _connectDb(mongodb, dbConfig, logger);
};

const _createModels = (db, res, models) => {
  models.forEach((el) => {
    if (el.hasOwnProperty("model")) {
      res.locals[el.name] = new el.model({ db });
    } else {
      res.locals[el.name] = new GeneratedMongoModel({
        db,
        model: { collection: el.collection },
      });
    }
  });
};

const startMongoConnector = (app, config, logger, models) => {
  const { dbConfig } = config;
  _dbConnector(app, mongodb, dbConfig, logger);
  return async (req, res, next) => {
    const { db } = app.locals.mongo;
    _createModels(db, res, models);
    next();
  };
};

module.exports = startMongoConnector;
