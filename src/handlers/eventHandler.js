const path = require('path');
const getAllFiles = require('@/utils/getAllFiles');

module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder); // string array
    eventFiles.sort((a, b) => a > b);

    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

    // When discord.js event emitter emit an `eventName` event, run all exported function inside the folder.
    // eventName might be 'ready', 'messageCreate' or 'interactionCreate'. Cannot change.
    client.on(eventName, async (arg) => { // arg would be emitted by discord.js
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(client, arg);
      }
    });
  }
};
