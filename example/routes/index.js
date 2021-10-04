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
    }
];

module.exports = routers;