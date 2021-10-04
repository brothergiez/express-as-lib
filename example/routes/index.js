const mongo = require('./mongo');
const { sequelizeHandler, sequelizeOthersHandler } = require('./sequelize');

const routers = [
    { 
        path: '/mongo', 
        method: 'GET',
        handler: mongo
    },
    { 
        path: '/sequelize', 
        method: 'GET',
        handler: sequelizeHandler
    },
    { 
        path: '/nilai', 
        method: 'GET',
        handler: sequelizeOthersHandler
    },
    { 
        path: '/', 
        method: 'GET',
        handler: (req, res) => {
            const message = 'Hello World! this page with no db called';
            res.send(message);
        }
    }
];

module.exports = routers;