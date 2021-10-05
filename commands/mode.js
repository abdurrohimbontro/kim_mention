const db = require('../src/db')

module.exports = async (message, arg) => {
  if (['channel', 'dm', 'off'].includes(arg)) {
    if (arg == 'channel') {
      let guild = await db.getGuild(message.guild.id)
      if (!guild.channelId) {
        return 'Admin belum menyetel saluran sebutan'
      }
    }
    let dmChannelId
    if (arg == 'dm') {
      let dmChannel = await message.author.createDM()
      dmChannelId = dmChannel ? dmChannel.id : null
    }
    await db.setMode(message.guild.id, message.member, dmChannelId, arg)
    return `Mode berubah menjadi ${arg}`
  }

  return 'Invalid option. Usage: `kimabsenbot mode <channel|dm|off>`'
}
