const NilaiModel = require('./nilaiModel');

const models = [
  {
    name: "UserModel",
    collection: "users",
  },
  {
    name: "AssetModel",
    collection: "assets",
  },
  {
    name: "NewsModel",
    model: NilaiModel
  },
];

module.exports = models;
