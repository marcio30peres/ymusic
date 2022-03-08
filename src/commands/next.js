module.exports = {
	run: async ( client, message ) => {
		const queue = client.player.getQueue(message.guildId)

		if (!queue) return

        const currentSong = queue.current

		queue.skip()
	},
}