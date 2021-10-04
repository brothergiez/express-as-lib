const { CreateServer } = require('../lib');
const routers = require('./routes');
const models = require('./models/sequelize/sequelizeModel');

const dbConfig = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    database: 'Sekolah',
    username: 'root',
    password: '123456'
}

const config = {
    dbConfig,
    apiVersion: 1.0
}

const createServer = new CreateServer({ routers, config, models });
const app = createServer.init();
createServer.start();