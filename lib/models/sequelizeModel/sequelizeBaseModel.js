class SequelizeBaseModel {
    constructor(args) {
        this.table = args.table
        this.db = args.db
    }

    async findByPk(id) {
        const result = await this.table.findByPk(id);
        return result;
    }

    async findAll(filter = null) {
        const result = await this.table.findAll(filter);
        return result;
    }
    
    async findOne(filter) {
        const result = await this.table.findOne(filter);
        return result;
    }

    async findAndCountAll(filter) {
        const result = await this.table.findAndCountAll(filter);
        return result;
    }

    async insert(payload) {
        const result = await this.table.create(payload);
        return result;
    }

    async insertMany(payload) {
        const result = await this.table.bulkCreate(payload);
        return result;
    }

    async count(filter) {
        const result = await this.table.count(filter);
        return result;
    }

    async delete(filter) {
        const result = await this.table.destroy(filter);
        return result;
    }

    _closeConnection() {
        this.db.close();
    }
};

module.exports = SequelizeBaseModel;