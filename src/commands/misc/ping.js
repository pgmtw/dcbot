module.exports = {
  name: 'ping',
  description: 'PPPPPPP',
  // devOnly: Boolean,
  // testOnly: true,
  // options: Object[],
  deleted: true,

  callback: (client, interaction) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },
};
