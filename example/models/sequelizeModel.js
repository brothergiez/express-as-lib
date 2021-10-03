const Sequelize = require("sequelize");

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

module.exports = [siswaModel];