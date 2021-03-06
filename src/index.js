const Discord = require('discord.js')
const http = require('http')
const db = require('./db')
const { add, remove, list, mode, name, channel, init, help } = require('../commands')
const PhraseBank = require('./PhraseBank')
const Sentry = require('@sentry/node')

const getEmbed = (message) => {
  return {
    title: 'Open in new tab',
    url: 'https://discordapp.com/channels/' +
      `${message.guild.id}/${message.channel.id}/${message.id}`,
    description: message.content,
    color: message.member ? message.member.displayColor : null,
    timestamp: message.createdAt,
    author: message.author ? {
      name: message.author.username,
      icon_url: message.author.avatarURL,
    } : null,
    footer: {
      text: `in #${message.channel.name}`
    }
  }
}

const client = new Discord.Client()

client.on('ready', () => {
  console.log('Discord client ready')
  client.user.setActivity('@kimabsenbot for help')
})

client.on('guildCreate', guild => db.createGuild(guild.id))
client.on('guildDelete', guild => db.destroyGuild(guild.id))

client.on('guildMemberUpdate', async (_, newMember) => {
  await db.setNickname(newMember)
  phraseBank.addPhrases(newMember.guild.id, [newMember.nickname])
})

client.on('userUpdate', async (_, newUser) => {
  let users = await db.setUsername(newUser)
  let guilds = users.map(user => user.guildId)
  Array.from(new Set(guilds)).map(guildId => phraseBank.addPhrases(guildId, [newUser.username]))
})

client.on('message', async (message) => {
  try {
    if (message.author.id == client.user.id) {
      return
    }

    if (message.channel.type != 'text') {
      message.channel.send(`this bot doesn't respond to DMs.`)
      return
    }

    if (message.content.startsWith(`<@${process.env.CLIENT_ID}>`)) {
      let command = message.content.replace(`<@${process.env.CLIENT_ID}> `, '')
      console.log(message.author.username + ':', command)

      let response
      if (command.startsWith('add ')) {
        response = await add(message, command.replace('add ', ''), phraseBank)
      } else if (command.startsWith('remove ')) {
        response = await remove(message, command.replace('remove ', ''))
      } else if (command.startsWith('list')) {
        response = await list(message)
      } else if (command.startsWith('mode ')) {
        response = await mode(message, command.replace('mode ', ''))
      } else if (command.startsWith('name ')) {
        response = await name(message, command.replace('name ', ''))
      } else if (command.startsWith('channel ')) {
        response = await channel(message, command.replace('channel ', ''))
      } else if (command.startsWith('init')) {
        response = await init(message)
      } else response = help(client)

      await message.channel.send(response)
      return
    }

    let matches
    if (matches =
      message.content.match(/\b(https:\/\/discordapp.com\/channels\/\d+\/\d+\/\d+)\b/)) {
      [...new Set(matches)].map(async (messageLink) => {
        let [_, guildId, channelId, messageId] =
          messageLink.match(/.*channels\/(\d+)\/(\d+)\/(\d+)/)

        let channel = message.guild.channels.filter(channel => channel.id == channelId).first()
        let linkedMessage = await channel.fetchMessage(messageId)

        message.channel.send('', { embed: getEmbed(linkedMessage) })
      })
    }

    if (phraseBank.hasGuild(message.guild.id)) {
      let phrases = phraseBank.findMatches(message.guild.id, message.content)
      let mentionees = await db.getMentionees(message.guild.id, message.author.id, phrases)
      if (!mentionees) {
        return
      }
      let guild = await db.getGuild(message.guild.id)
      mentionees.map(async (mentionee) => {
        let recipient = message.guild.members.get(mentionee.id)
        let permissions = recipient.permissionsIn(message.channel)
        if (!permissions.has(Discord.Permissions.FLAGS.READ_MESSAGES)) {
          return
        }

        let embed = getEmbed(message)

        if (mentionee.mode == 'dm') {
          let dmChannel = await client.users.get(mentionee.id).createDM()
          dmChannel.send(`<@${message.author.id}> mentioned you in <#${message.channel.id}>`, { embed })
        } else if (mentionee.mode == 'channel') {
          let channel = await client.channels.get(guild.channelId)
          channel.send(`<@${mentionee.id}>, @${message.member.nickname || message.author.username} mentioned you in <#${message.channel.id}>`, { embed })
        }
      })
    }
  } catch (e) {
    console.log(e)
  }
})

client.on('error', (error) => {
  console.log(error.message)
  client.login(process.env.TOKEN)
})

Sentry.init({ dsn: process.env.SENTRY_DSN })

client.login(process.env.TOKEN)

http.createServer().listen(process.env.PORT)

let phraseBank
db.getGuildsWithPhrases().then((guildsWithPhrases) => {
  phraseBank = new PhraseBank(guildsWithPhrases)
})
