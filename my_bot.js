const Discord = require('discord.js')
const client = new Discord.Client()

const BOT_PREFIX = '!'

const COLLEGES = {
    'CIT': 'CIT',
    'DCU': 'DCU',
    'TCD': 'TCD',
    'UCD': 'UCD',
    'MU': 'MU',
    'UCC': 'UCC',
    'NUIG': 'NUIG/GMIT',
    'GMIT': 'NUIG/GMIT',
    'NCI': 'NCI',
    'WIT': 'WIT',
    'CDCFE': 'CDCFE',
    'LYIT': 'LYIT',
    'AIT': 'AIT',
    'TUD': 'TUD',
    'QUB': 'QUB',
    'UL': 'UL',
    'ITC': 'ITC',
    'DBS': 'DBS',
    'BFEI': 'BFEI',
    'ITS': 'IADT',
    'DKIT': 'DKIT',
    'LIT': 'LIT',
    'UU': 'UU',
}

const GAMES = {
    'LOL': 'Legends of Legends',
    'LEAGUE': 'Legends of Legends',
    'ROCKET': 'Rocket League',
    'COUNTER-STRIKE': 'CS:GO',
    'COUNTERSTRIKE': 'CS:GO',
    'CS:GO': 'CS:GO',
    'CSGO': 'CS:GO',
    'CS': 'CS:GO',
    'HALO': 'Halo',
    'R6': 'R6 Siege',
    'SIEGE': 'R6 Siege',
    'SMASH': 'Smash Ultimate',
    'OVERWATCH': 'Overwatch',
    'OW': 'Overwatch',
    'TFT': 'Teamfight Tactics',
    'TEAMFIGHT': 'Teamfight Tactics',
    'FIFA': 'Fifa',
}

client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}!`)
    
    client.user.setActivity("with Portals 🌀 v1.0.1")
})

client.on('message', (receivedMessage) => {
    messageIsFromSelf = receivedMessage.author == client.user
    if (messageIsFromSelf) {
        return
    }

    if (receivedMessage.content.startsWith(BOT_PREFIX)) {
        processCommand(receivedMessage)
    }
})

client.on('guildMemberAdd', member => {
    member.send('Hello!')
  });


const processCommand = (receivedMessage) => {
    const fullCommand = receivedMessage.content.substr(1)
    const splitCommand = fullCommand.split(" ")
    const primaryCommand = splitCommand[0]
    const args = splitCommand.slice(1)

    switch (primaryCommand) {
        case 'college':
            collegeCommand(args, receivedMessage)
            break
        case 'game':
            gameCommand(args, receivedMessage)
            break
        default:
            console.log(`No command found for ${primaryCommand}`)
            break
    }
}

const collegeCommand = (arguments, receivedMessage) => {
    let roleName = COLLEGES[arguments[0].toUpperCase()]

    if (!roleName) {
        receivedMessage.author.send(`❌ You've specified an invalid college. Please check your command carefully. If you're sure you've entered it correctly, please contact an administrator to have your place of education added to our options.`)
        return
    }
    
    const role = receivedMessage.guild.roles.cache.find(role => role.name === roleName)

    if (!role) {
        receivedMessage.author.send(`Sorry! 😢 An error has occured. Please contact an administrator, or try again.`)
        return
    }

    try {
        receivedMessage.guild.members.cache.get(receivedMessage.author.id).roles.add(role)
        receivedMessage.author.send(`✅ You've been added to the group: ${roleName} 🎉`)
    } catch (error) {
        console.log(`Error assigning role ${arguments[0]} to user ${receivedMessage.author}.`)
    }
}

const gameCommand = (arguments, receivedMessage) => {
    let roleName = GAMES[arguments[0].toUpperCase()]

    if (!roleName) {
        receivedMessage.author.send(`❌ You've specified an invalid game. Please check your command carefully. If you're sure you've entered it correctly, please contact an administrator to have it added to our options.`)
        return
    }
    
    const role = receivedMessage.guild.roles.cache.find(role => role.name === roleName)

    if (!role) {
        receivedMessage.author.send(`Sorry! 😢 An error has occured. Please contact an administrator, or try again.`)
        return
    }

    try {
        receivedMessage.guild.members.cache.get(receivedMessage.author.id).roles.add(role)
        receivedMessage.author.send(`✅ You've been added to the group: ${roleName} 🎉`)
    } catch (error) {
        console.log(`Error assigning role ${arguments[0]} to user ${receivedMessage.author}.`)
    }
}

client.login('NzM2OTYxMDg4MTYzMjgzMDQ1.Xx2afw.ZrNAFXty0ysKNhNZFASIxyGrLa0')