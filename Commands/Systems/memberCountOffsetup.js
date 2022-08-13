const { CommandInteraction } = require("discord.js");
const DB = require("../../Schemas/VoiceChannelNotMemberCountDB");

module.exports = {
  name: "membercountoff",
  description: "Use to opt out voice channel to count member.",
  usage: "/membercountoff",
  context: true,
  permissions: ["MANAGE_CHANNELS"],
  options: [
    {
      name: "add",
      description: "Add Channel to opt out.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "channel",
          description: "Channel name",
          type: "CHANNEL",
          required: true,
        },
      ],
    },
    {
      name: "remove",
      description: "Remove Channel to opt in.",
      type: "SUB_COMMAND",
      options: [
        {
          name: "channel",
          description: "Channel name",
          type: "CHANNEL",
          required: true,
        },
      ],
    },
    {
      name: "delete",
      description: "Delete all channel to opt in",
      type: "SUB_COMMAND",
    },
  ],

  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { guild, options } = interaction;
    const SubCommand = options.getSubcommand();
    const channel = options.getChannel("channel");

    switch (SubCommand) {
      case "add":
        try {
          await DB.findOneAndUpdate(
            { GuildID: guild.id },
            {
              $push: { ChannelIDs: channel.id },
            },
            {
              new: true,
              upsert: true,
            }
          );
          interaction.reply({ content: "Done", ephemeral: true });
        } catch (err) {
          console.log(err);
        }
        break;
    }
  },
};
