const { Player } = require("discord-player")
const Discord = require("discord.js")
const express = require('express');
const dotenv = require("dotenv")


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

client.login(TOKEN)