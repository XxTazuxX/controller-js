const { model, Schema } = require("mongoose");

module.exports = model(
  "CryptoApiGateioDB",
  new Schema({
    user: String,
    api: String,
    key: String,
  })
);
