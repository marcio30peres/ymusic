const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	run: async (client, message) => {
        message.delete()
		if (!message.member.voice.channel) return

		const queue = await client.player.createQueue(message.guild)
		if (!queue.connection) await queue.connect(message.member.voice.channel)

        let url = message.content;
   
        const result = await client.player.search(url, {
            requestedBy: message.user,
            searchEngine: QueryType.AUTO
        })
        
        const song = result.tracks[0]
        await queue.addTrack(song)
        
        if (!queue.playing) await queue.play()
	},
}