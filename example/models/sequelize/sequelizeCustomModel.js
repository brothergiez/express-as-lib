const Sequelize = require("sequelize");
const { SequelizeBaseModel } = require("../../../lib");

const {
  errors: { CustomError },
} = require("custom-error-exceptions");

class SequelizeCustomModel extends SequelizeBaseModel {
	constructor(opts) {
    super(opts);
    Object.assign(this, opts);
    if (!this.db) {
      throw new CustomError('Database must be fullfilled');
    }
    this.table = 'nilai';
  }

	async save(payload) {
		const result  = await this.db.query(`INSERT INTO ${this.table} (siswaId, nilai) VALUES ('${payload.siswaId}', '${payload.nilai}')`);
		return result;
	}
}

module.exports = SequelizeCustomModel;