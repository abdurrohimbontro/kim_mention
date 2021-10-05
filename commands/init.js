const Discord = require('discord.js')
const db = require('../src/db')

module.exports = async (message) => {
  if (!message.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
    return 'Anda harus menjadi admin untuk init'
  }

  await db.createGuild(message.guild.id)
  return 'Init sukses'
}
