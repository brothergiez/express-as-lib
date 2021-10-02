const mongodb = require("mongodb");
const MongoBaseModel = require('../models/mongoBaseModel');

const createConnectionString = (dbConfig) => {
    const { instances, options, database, username, password } = dbConfig;
    const encodedPassword = encodeURIComponent(password);
  
    let connectionString = `mongodb://${instances}/${database}`;
    if(username && password) {
      //  Create the creds, return a connection string with the options if provided.
      const creds = `${username}:${encodedPassword}`;
      connectionString = `mongodb://${creds}@${instances}/${database}`;
    }
    return options ? `${connectionString}?${options}` : connectionString;
  }

const _connectDb = async (mongodb, dbConfig, logger) => {
    const { MongoClient } = mongodb;
    const connectionString = createConnectionString(dbConfig);
    logger.info(`connecting to: ${connectionString}...`);
    const client = await MongoClient.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    if (client) {
      logger.info('database connected');
    }
    return {
      db: client.db(dbConfig.database),
      client,
    };
  };

const dbConnector = async (app, mongodb, dbConfig, logger) => {
    app.locals.mongo = await _connectDb(mongodb, dbConfig, logger);
};

const createModels = (db, res, models) => {
    models.forEach(el => {
      res.locals[el.name] = new MongoBaseModel({ db, model: { collection: el.collection }})
    });
  }

const startAppMiddleware = (app, config, logger, models) => {
    const { dbConfig } = config;
    dbConnector(app, mongodb, dbConfig, logger);
    return async (req, res, next) => {
        const { db } = app.locals.mongo;
        res.locals.config = config;
        createModels(db, res, models);
        next();
    };
};


module.exports = startAppMiddleware;