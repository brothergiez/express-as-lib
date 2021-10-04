const { CreateServer } = require('../lib');
const routers = require('./routes');

const config = {}

const createServer = new CreateServer({ routers, config });
createServer.start();