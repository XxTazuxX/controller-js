const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description:
    "Deletes a specified number of messages from channel or a target.",
  usage: "/clear [amount]",
  context: true,
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "amount",
      description:
        "Select the amount of messages to delete from a channel or target.",
      type: "NUMBER",
      required: true,
    },
    {
      name: "target",
      description: "Select a target user to clear their messages",
      type: "USER",
      required: false,
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const { channel, options } = interaction;

    const Amount = options.getNumber("amount");
    const Target = options.getMember("target");

    const Messages = await channel.messages.fetch();

    const Response = new MessageEmbed().setColor("YELLOW");

    if (Target) {
      let i = 0;
      const filtered = [];
      (await Messages).filter((m) => {
        if (m.author.id === Target.id && Amount > i) {
          filtered.push(m);
          i++;
        }
      });
      await channel
        .bulkDelete(filtered, true)
        .then((messages) => {
          Response.setDescription(
            `<a:Penguin_Mopping:995402652848488578> cleared ${messages.size} messages from ${Target}.`
          );
          interaction.reply({ embeds: [Response] });
        })
        .catch(console.error);
    } else {
      if (Amount > 100) {
        Response.setDescription(`Amount should be less then 100 <:pepeslam:853031600698818591>
        `);
        return interaction.reply({ embeds: [Response] });
      }
      const messages = await channel.messages.fetch({ limit: Amount });
      Response.setDescription(
        `<a:Penguin_Mopping:995402652848488578> cleared ${messages.size} messages from this channel`
      );
      messages.forEach((message) => {
        message.delete();
      });
      interaction.reply({ embeds: [Response] });
    }
  },
};
