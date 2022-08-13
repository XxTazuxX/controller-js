const { GuildMember, WebhookClient, MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  /**
   *
   * @param {GuildMember} member
   */
  execute(member) {
    const { user, guild } = member;

    const Welcomer = new WebhookClient({
      id: "1008082497202028614",
      token:
        "8Z3pPZv0ar9tAkNl6QWVw4kJad5b-KqFjN0tLTnlaTeb_4wzXRPyLk6sySOA-wRtJM_J",
    });

    const Welcome = new MessageEmbed()
      .setColor("DARK_BLUE")
      .setAuthor({
        name: user.tag,
        iconURL: user.avatarURL({ dynamic: true, size: 512 }),
      })
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setImage()
      .setDescription(
        `Welcome ${member} to the **${guild.name}**!\n 
      Account Created: <t:${parseInt(
        user.createdTimestamp / 1000
      )}:R>\nLatest Member Count: **${guild.memberCount}**`
      )
      .setFooter({ text: `ID: ${user.id}` });

    Welcomer.send({ embeds: [Welcome] });
  },
};
