const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

client.login('ODExNjYxNjY3OTQzNDQ4NTk2.YC1c1Q.S3-pRy8Hd-S5OvmmJn46DffFRBU');

