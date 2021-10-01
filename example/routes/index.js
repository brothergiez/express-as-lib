const home = require('./home');
const about = require('./about');

const routers = [
    { 
        path: '/', 
        method: 'GET',
        handler: home
    },
    { 
        path: '/about', 
        method: 'GET',
        handler: about
    }
];

module.exports = routers;