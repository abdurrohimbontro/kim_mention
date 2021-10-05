const Discord = require('discord.js')
const db = require('../src/db')

module.exports = async (message, args) => {
  if (!message.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
    return 'Anda harus menjadi admin untuk mengubah saluran sebutan'
  }

  let channel = args.match(/<#(\d+)>/)
  if (channel) {
    channel = message.guild.channels.get(channel[1])
    if (channel) {
      await db.setChannel(message.guild.id, channel.id)
      return `Sebutkan saluran yang disetel ke <#${channel.id}>`
    }
  }

  return 'Invalid channel. Usage: `@kimabsenbot Channel #<nama saluran>`'
}
