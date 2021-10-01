const CreateServer = require('../lib/server/createServer');
const routers = require('./routes');

const createSever = new CreateServer({ routers });
createSever.start();