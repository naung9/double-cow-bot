const Discord = require('discord.js');
const client = new Discord.Client();
const botToken = "ODU4NzY5NTgxNTYwNTYxNjc0.YNi9fw.dvTg2J-Y8UCf3ML35eHKUwERSHk";

client.on('ready', () => {
    console.log(`Logged in...`);
});

client.on('message', msg => {
    if(msg.author.bot) return;
    msg.reply(`လီးပဲ ${msg.author.username}`);
});

client.login(botToken);
