const home = require('./mongo');
const about = require('./sequelize');

const routers = [
    { 
        path: '/mongo', 
        method: 'GET',
        handler: home
    },
    { 
        path: '/sequelize', 
        method: 'GET',
        handler: about
    }
];

module.exports = routers;