const MongoBaseModel = require('./mongoBaseModel');

const {
  errors: { CustomError },
} = require('custom-error-exceptions');

class GeneratedMongoModel extends MongoBaseModel {
  constructor(opts) {
    super(opts);
    Object.assign(this, opts);
    if (!this.db) {
      throw new CustomError('Database must be fullfilled');
    }
    this.collection = this.db.collection(this.model.collection);
  }
}

module.exports = GeneratedMongoModel;