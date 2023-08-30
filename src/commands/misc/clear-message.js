const { Client, Interaction, ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        await interaction.deferReply();
        const amount = interaction.options.get(`amount`)?.value || 1;

        if(isNaN(amount)){ // should not be run this
            interaction.editReply(`The amount is not a number.`);
            return;
        } else if(amount < 1 || amount > 20){
            interaction.editReply(`The amount should be 1~20.`);
            return;
        }

        // fetch the reply
        // must use await; must get the value of fetchReply() before accessing property '.id'
        const reply = await interaction.fetchReply();
        const replyId = reply.id;
        // fetch and delete message(s)
        const fetchedMessages = await interaction.channel.messages.fetch({ limit: amount, before: replyId});
        await interaction.channel.bulkDelete(fetchedMessages, true);
        if(amount === 1){
            interaction.editReply(`${fetchedMessages.size} message has been delete.`);
            return;
        } else {
            interaction.editReply(`${fetchedMessages.size} messages have been delete.`);
            return;
        }
    },
    name: `clear`,
    description: `Clear some messages in the channel.`,
    options: [
        {
            name: `amount`,
            description: `The amount (1~20) of messages you wanna clear.`,
            type: ApplicationCommandOptionType.Number,
        }
    ]
};