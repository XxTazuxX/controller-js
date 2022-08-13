const { model, Schema } = require("mongoose");

module.exports = model(
  "Channels",
  new Schema({
    GuildID: String,
    ChannelIDs: [
      {
        Channel: String,
        name: String,
      },
    ],
  })
);
