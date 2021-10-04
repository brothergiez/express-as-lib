const config = {
    databases : {
        sequelizeSupportDialect: ['mysql', 'mariadb', 'sqlite', 'postgres', 'mssql'],
        mongodbDialect: 'mongodb'
    },
    defaultCorsOptions: {}
}

module.exports = config;