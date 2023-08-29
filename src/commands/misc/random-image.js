const { Client, Interaction, ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder} = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
/**
 * 
 * @param {Client} client 
 * @param {Interaction} interaction 
 */
    callback: async (client, interaction) => {
        await interaction.deferReply();
        // get specific amount of random images
        const amount = interaction.options.get(`amount-of-images`)?.value || 1; // number
        const imageFiles = fs.readdirSync(path.join(__dirname + '../../../images')); // an array of string
        const randomFiles = [];
        const imagePaths = [];
        const attachments = [];
        for(let i =0; i<amount; i++){
            const randomIndex = Math.floor(Math.random() * imageFiles.length);
            randomFiles.push(imageFiles[randomIndex]);
            imagePaths.push(path.join(__dirname +'../../../images/' + randomFiles[randomFiles.length-1]));
            attachments.push(new AttachmentBuilder(imagePaths[i]));
        }
        await interaction.editReply({files: attachments}); // the value of files should be an array

    },
    name: 'random-image',
    description: `Show random bot built-in images.`,
    options: [
        {
            name: `amount-of-images`,
            description: `The amount of random images you want.`,
            type: ApplicationCommandOptionType.Number,
        }
    ]
}