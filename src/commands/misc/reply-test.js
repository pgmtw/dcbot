module.exports = {
    name: `re`,
    description: `test if don't reply the interaction`,
    deleted: true,
    callback: (client, interaction) => {
        //interaction.channel.send(`message sent`);
        interaction.reply(`reply`)
    }
  };