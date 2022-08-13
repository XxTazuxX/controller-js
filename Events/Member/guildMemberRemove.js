const { GuildMember, WebhookClient, MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  /**
   *
   * @param {GuildMember} member
   */
  execute(member) {
    const { user, guild } = member;

    const Loger = new WebhookClient({
      id: "1008082791285674074",
      token:
        "bFPYT8HFRGQ8GBn79UKCMfLhcn-EW6IUDaHqa1oI_0B2vLsolPe6BrW3vdcek0doq8He",
    });

    const Thada = new MessageEmbed()
      .setColor("DARK_RED")
      .setAuthor({
        name: user.tag,
        iconURL: user.avatarURL({ dynamic: true, size: 512 }),
      })
      .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
      .setDescription(
        `${user.username} has left the community\n 
      Joined: <t:${parseInt(
        member.joinedTimestamp / 1000
      )}:R>\nLatest Member Count: **${guild.memberCount}**`
      )
      .setFooter({ text: `ID: ${user.id}` });

    Loger.send({ embeds: [Thada] });
  },
};
