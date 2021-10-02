const { CreateServer } = require('../lib');
const routers = require('./routes');
const models = require('./models');

const dbConfig = {
    instances: 'localhost:27017',
    options: '',
    username: '',
    password: '',
    database: 'Sekolah',
};

const config = {
    dbConfig,
    apiVersion: 1.0
}

const createSever = new CreateServer({ routers, config, models });
const app = createSever.init();
createSever.start();