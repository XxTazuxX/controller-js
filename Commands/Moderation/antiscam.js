const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const DB = require("../../Schemas/AntiScamDB");

module.exports = {
  name: "antiscam",
  description: "Setup Anti-Scam",
  usage: "/antiscam [command]",
  context: true,
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "setup",
      description: "Anti-Scam Settings",
      type: "SUB_COMMAND",
      options: [
        {
          name: "logs",
          description: "Logs a scam message",
          type: "CHANNEL",
          channelType: ["GUILD_TEXT"],
          required: true,
        },
      ],
    },
    {
      name: "reset",
      description: "Reset your AntiScam system",
      type: "SUB_COMMAND",
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { guild, options } = interaction;
    const SubCommand = options.getSubcommand();

    switch (SubCommand) {
      case "setup":
        const log = options.getChannel("logs");
        DB.findOne({ Guild: guild.id }, async (err, data) => {
          if (data) data.delete();
          new DB({
            Guild: interaction.guild.id,
            Channel: log.id,
          }).save();
          interaction.reply({
            content: "AntiScam system has been setup.",
            ephemeral: true,
          });
        });
        break;
      case "reset":
        DB.findOne({ Guild: guild.id }, async (err, data) => {
          if (!data)
            return interaction.reply({
              embeds: [
                new MessageEmbed()
                  .setDescription("AntiScam system is not setup.")
                  .setColor("DARK_RED"),
              ],
              ephemeral: true,
            });

          data.delete();
          interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor("DARK_RED")
                .setDescription("Your AntiScam system has been reset."),
            ],
            ephemeral: true,
          });
        });
        break;
    }
  },
};
