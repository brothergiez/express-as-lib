const CreateServer = require('./lib/server/createServer');

const sampleHandler = (req, res) => {
    res.send('Hello World!')
}

const routers = [
    { 
        path: '/', 
        method: 'GET',
        handler: sampleHandler
    }
];

const createSever = new CreateServer({ routers: routers });
const app = createSever.init();
// console.log(app);