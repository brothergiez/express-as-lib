const NewsModel = require('./newsModel');

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
    model: NewsModel
  },
];

module.exports = models;
