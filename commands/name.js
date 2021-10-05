const db = require('../src/db')

module.exports = async (message, arg) => {
  if (['username', 'nickname', 'both', 'off'].includes(arg)) {
    await db.setNameOpt(message.guild.id, message.member, arg)
    return `Mode penyebutan nama diubah menjadi ${arg}`
  }

  return 'Invalid option. Usage: `@kimabsenbot name <username|nickname|both|off>`'
}
