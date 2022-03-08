const { MessageEmbed } = require("discord.js")
const { Player } = require("discord-player")
const Discord = require("discord.js")
const express = require('express');
const dotenv = require("dotenv")

const play = require('./commands/play')
const pause = require('./commands/pause')
const resume = require('./commands/resume')
const next = require('./commands/next')
const clear = require('./commands/clear')
const list = require('./commands/list')

dotenv.config()
const PORT = process.env.PORT
const TOKEN = process.env.TOKEN

const app = new express()

app.get('/', (request, response) => {
    response.status(200).send()
})

app.listen(PORT)

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_PRESENCES",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGE_REACTIONS"
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

client.on("ready", () => {
    console.log("YMusic's running!")
})

client.on("messageCreate", async (message) => {
    if(message.channelId !== process.env.CHANNEL_ID) return
    if(message.content == '.setup') {
        let embed = new MessageEmbed()
        embed
        .setDescription(`**Bem-vindo à YMusic**`)
        .setImage('https://static.techspot.com/images2/news/bigimage/2019/07/2019-07-19-image.png')

        const emb = await message.channel.send({
            embeds: [embed]
        })
        emb.react('▶️')
        emb.react('⏸️')
        emb.react('⏩')
        emb.react('⏹️')
        emb.react('🇱')
        
        console.log(emb)
        return
    }

    await play.run(client, message)
})

client.on('messageReactionAdd', async (reaction, user) => {
    switch (reaction.emoji.name) {
        case '▶️':
            resume.run(client, reaction.message)
            break;
        case '⏸️':
            pause.run(client, reaction.message)
            break;
        case '⏩':
            next.run(client, reaction.message)
            break;
        case '⏹️':
            clear.run(client, reaction.message)
            break;
        case '🇱':
            list.run(client, reaction.message)
            break;
    }

    await reaction.users.remove(user.id);
});

client.login(TOKEN)