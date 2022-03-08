const { MessageEmbed } = require("discord.js")

module.exports = {
    run: async ( client, message ) => {
        const queue = client.player.getQueue(message.guildId)
        
        if (queue) {
            const queueString = queue.tracks.map((song, i) => {
                return `${song.title} - [${song.duration}]`
            }).join("\n")
    
            const currentSong = queue.current
    
            const msg = await message.channel.messages.fetch(process.env.EMBED_ID)
            await msg.edit({
                embeds: [
                    new MessageEmbed()
                        .setDescription(
                            (currentSong ? `**${currentSong.title} - [${currentSong.duration}]**` : "Nenhuma") +
                            `\n\n${queueString}`
                        )
                        .setImage('https://static.techspot.com/images2/news/bigimage/2019/07/2019-07-19-image.png')
                ]
            })
            setTimeout(async (msg) => {
                await msg.edit({
                    embeds: [
                        new MessageEmbed()
                        .setDescription(`**Bem-vindo à YMusic**`)
                        .setImage('https://static.techspot.com/images2/news/bigimage/2019/07/2019-07-19-image.png')
                    ]
                })
            }, 5000, msg)
            return
        }

        const msg = await message.channel.messages.fetch(process.env.EMBED_ID)
        await msg.edit({
            embeds: [
                new MessageEmbed()
                .setTitle(`Bem-vindo à YMusic`)
                .setImage('https://static.techspot.com/images2/news/bigimage/2019/07/2019-07-19-image.png')
            ]
        })
    }
}