const { model, Schema } = require("mongoose");

module.exports = model(
  "CryptoApiBinanceDB",
  new Schema({
    user: String,
    api: String,
    key: String,
  })
);
