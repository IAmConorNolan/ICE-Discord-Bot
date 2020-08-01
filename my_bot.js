const Discord = require('discord.js')
const client = new Discord.Client()

const BOT_PREFIX = '!'

const BOT_COMMAND_CHANNEL_ID = '584072066643263493'

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
    'SUPPORTER': 'Supporter',
    'ALUMNI': 'alumni',
}

const GAMES = {
    'LOL': 'League of Legends',
    'LEAGUE': 'League of Legends',
    'ROCKET': 'Rocket League',
    'RL': 'Rocket League',
    'COUNTER-STRIKE': 'CS:GO',
    'COUNTERSTRIKE': 'CS:GO',
    'CS:GO': 'CS:GO',
    'CSGO': 'CS:GO',
    'CS': 'CS:GO',
    'HALO': 'Halo',
    'R6': 'R6 Siege',
    'SIEGE': 'R6 Siege',
    'SMASH': 'Smash Ultimate',
    'TFT': 'Teamfight Tactics',
    'TEAMFIGHT': 'Teamfight Tactics',
    'FIFA': 'Fifa',
    'VALORANT': 'Valorant'
}

client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}!`)

    client.user.setActivity("with Portals 🌀 v1.0.4")
})

client.on('message', (receivedMessage) => {
    messageIsFromSelf = receivedMessage.author == client.user
    if (messageIsFromSelf) {
        return
    }

    if (receivedMessage.content.startsWith(BOT_PREFIX) && receivedMessage.channel.id === BOT_COMMAND_CHANNEL_ID) {
        processCommand(receivedMessage)
    }
})

client.on('guildMemberAdd', member => {
    const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Welcome to Irish Collegiete Esports 👋')
        .setDescription("There's just a little bit of setup to go through before you're finished. Please navigate to the #roles channel to be assigned the corresponding role for your college. Once done, you'll be able to send messages.")
        .setThumbnail('https://pbs.twimg.com/profile_images/1218662670469038080/kQRDFoTe_400x400.jpg')
        .setTimestamp()
        .setFooter('Beep Boop 🤖', 'https://pbs.twimg.com/profile_images/1218662670469038080/kQRDFoTe_400x400.jpg');
    member.send(embed)
});


const processCommand = (receivedMessage) => {
    const fullCommand = receivedMessage.content.substr(1)
    const splitCommand = fullCommand.split(" ")
    const primaryCommand = splitCommand[0].toLowerCase()
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

client.login(process.env.BOT_TOKEN)