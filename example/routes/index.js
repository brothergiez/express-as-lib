const mongo = require('./mongo');
const sequelize = require('./sequelize');

const routers = [
    { 
        path: '/mongo', 
        method: 'GET',
        handler: mongo
    },
    { 
        path: '/sequelize', 
        method: 'GET',
        handler: sequelize
    }
];

module.exports = routers;