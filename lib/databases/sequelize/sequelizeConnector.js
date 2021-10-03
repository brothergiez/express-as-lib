const Sequelize = require("sequelize");
const generatedModels = require('../../models/sequelizeModel/generatedSqlModel');
const SequelizeBaseModel = require('../../models/sequelizeModel/sequelizeBaseModel');

const connectDB = (app, config) => {
    const { host, port, dialect, pool, database, username, password } = config;
    const sequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect,
        pool
    });
    app.locals.db = sequelize;
    return sequelize;
}

const _createModels = (db, models) =>{
    return models.map(model => {
        model.generatedModel = generatedModels(db, model);
        return model;
    }); 
}

const _generatingConnector = (db, res, models) => {
    models.forEach(model => {
        res.locals[model.name] = new SequelizeBaseModel({ db, table: model.generatedModel });
    });
}

const startSequelizeConnector = (app, config, logger, models) => {
    const { dbConfig } = config;
    const db = connectDB(app, dbConfig);
    app.use(async (req, res, next) => {
        res.locals.database = db;
        const model = _createModels(db, models);
        _generatingConnector(db, res, model);
        // res.locals.UserDbConnector = new DbConnector({ db, table: userModel(db) });
        next();
    })
}


module.exports = startSequelizeConnector;