const { MongoBaseModel } = require('../../lib');

const {
  errors: { CustomError },
} = require('custom-error-exceptions');

class NilaiModel extends MongoBaseModel {
  constructor(opts) {
    super(opts);
    Object.assign(this, opts);
    if (!this.db) {
      throw new CustomError('Database must be fullfilled');
    }
    this.collection = this.db.collection('nilai');
  }
}

module.exports = NilaiModel;