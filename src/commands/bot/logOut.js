module.exports = {
    name: 'log-out-bot',
    description: 'log out the bot',
    callback: async (client, interaction) => {
        try {
            await client.user.setPresence({ status: 'invisible' });
            await interaction.reply('The bot has logged out.');
            process.exit(0);
        } catch (error) {
            console.log(`Error when logging out: ${error}`)
        }
    }
}