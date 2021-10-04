const CreateServer = require('./server/createServer');
const MongoBaseModel = require('./models/mongoModel/mongoBaseModel');
const SequelizeBaseModel = require('./models/sequelizeModel/sequelizeBaseModel');

module.exports = {
    CreateServer,
    MongoBaseModel,
    SequelizeBaseModel
};
