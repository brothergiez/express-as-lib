const Sequelize = require("sequelize");
const sequelizeCustomeModel = require('./sequelizeCustomModel');

const siswaModel = {
    name: 'SiswaDbConnector',
    table: 'siswa',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nama: Sequelize.STRING,
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },    
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }
};

const nilaiModel = {
    name: 'NilaiDbConnector',
    table: 'nilai',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        siswaId: {
            type: Sequelize.INTEGER
        },
        nilai: {
            type: Sequelize.INTEGER
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },    
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    model: sequelizeCustomeModel
};

module.exports = [siswaModel, nilaiModel];