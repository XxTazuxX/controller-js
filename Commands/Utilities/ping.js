const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Replies with pong",
  usage: "/ping",
  context: true,
  /**
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    interaction.reply({ content: "pong" });
  },
};
