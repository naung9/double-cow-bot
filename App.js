const Discord = require('discord.js');
const client = new Discord.Client();
const botToken = "ODU4NzY5NTgxNTYwNTYxNjc0.YNi9fw.dvTg2J-Y8UCf3ML35eHKUwERSHk";

const prefix = "!";
const curseWords = ["လီးပဲ", "ငါလိုးမသား", "မအေလိုး", "ကိုမေကိုလိုး", "စောက်ရူး", "နွား", "စောက်သုံးမကျတဲ့"];

client.on('ready', () => {
    console.log(`Logged in...`);
});

client.on('message', msg => {

    if(msg.author.bot) return;
    if(!msg.content.startsWith(prefix))return;
    const commandBody = msg.content.slice(prefix.length);
    const commands = commandBody.split(" ");
    console.log(commands);
    if(commands[0] === "curse"){
        let replyMessage;
        if(commands.length > 1){
            replyMessage = `${curseWords[Math.floor(Math.random()*curseWords.length)]} ${commands.reduce((acc, current, index)=>{
                if(index > 0) return acc + " " + current;
                else return acc;
            }, "")}`;
        }else {
            replyMessage = `${curseWords[Math.floor(Math.random()*curseWords.length)]} ${msg.author.username}`;
        }
        msg.channel.send(replyMessage);
    }
});

client.login(botToken);
