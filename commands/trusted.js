const Discord = require('discord.js');

/**
 * @param {Discord.GuildMember} bot
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {string} command
 * @param {string[]} args
 */
module.exports.run = async (bot, client, config, message, command, args) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor(bot.nickname ? bot.nickname : bot.user.username, client.user.avatarURL())
    .setFooter(`${message.member.nickname ? message.member.nickname : message.member.user.username}: ${config.prefix}${command} ${args.join(' ')}`, message.member.user.avatarURL());
  if (message.mentions.members.size <= 0) return message.channel.send(embed.setColor('RED').setDescription('Invalid command usage'));
  if (!message.mentions.members.first().roles.has(config.trustedRoleID)) {
    message.mentions.members.first().roles.add(config.trustedRoleID, `${message.author.tag}: ${config.prefix}${command} ${args.join(' ')}`);
    embed.setDescription(`Gave the trusted role to ${message.mentions.members.first().user.tag}`);
  } else {
    message.mentions.members.first().roles.remove(config.trustedRoleID, `${message.author.tag}: ${config.prefix}${command} ${args.join(' ')}`);
    embed.setDescription(`Removed the trusted role from ${message.mentions.members.first().user.tag}`);
  }
  embed.setColor('GREEN');
  message.channel.send(embed);
};

module.exports.help = {
  name: 'trusted',
  description: 'Give someone the trusted role (or remove it from them)',
  usage: '<user-mention>',
  examples: ['@AlexejheroYTB#1636'],
  aliases: null,
  permission: 'staff',
  disabled: false,
};
