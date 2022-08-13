const { model, Schema } = require("mongoose");

module.exports = model(
  "VoiceChannelNotMemberCount",
  new Schema({
    GuildID: String,
    ChannelIDs: [
      {
        type: String,
      },
    ],
  })
);
