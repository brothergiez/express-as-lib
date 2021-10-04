const { CreateServer } = require('../lib');
const routers = require('./routes');
const models = require('./models/mongo');

const dbConfig = {
    instances: 'localhost:27017',
    options: '',
    username: '',
    password: '',
    database: 'Sekolah',
    dialect: 'mongodb'
};

const config = {
    dbConfig,
    apiVersion: 1.0
}

const createServer = new CreateServer({ routers, config, models });
const app = createServer.init();
createServer.start();