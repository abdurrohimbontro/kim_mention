const db = require('../src/db')

module.exports = async (message) => {
  let user = await db.getSettingsAndPhrases(message.guild.id, message.member)
  return `
settings
--------

menyebutkan mode: ${user.mode}
mode penyebutan nama: ${user.nameOpt}

phrases
-------
${user.phrases.map(phrase => phrase.text).join('\n')}
  `
}
