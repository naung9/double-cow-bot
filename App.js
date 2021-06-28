const Discord = require('discord.js');
const client = new Discord.Client();
const botToken = "ODU4NzY5NTgxNTYwNTYxNjc0.YNi9fw.dvTg2J-Y8UCf3ML35eHKUwERSHk";

const prefix = "!";
const curseWords = ["လီးပဲ", "ငါလိုးမသား", "မအေလိုး", "ကိုမေကိုလိုး", "စောက်ရူး", "နွား", "စောက်သုံးမကျ"];
const relayWords = ["ဖင်ချချင်", "ဖင်ခံချင်"];
const dcWords = ["ဖာတန်းသွား", "ဖဲသွားရိုက်", "အကင်သွားစား", "Hot Pot သွားစား", "ဖာသွားချ"];
const dontWords = ["မပေနဲ့", "မထုံနဲ့", "လီးစကားမပြောနဲ့", "လီးလီးလားလားမလုပ်နဲ့" ];
const dcMembers = ["ထုံကြီး", "ပေါက်ကြီး", "ကုလား", "ထောရှန်", "အေဇက်", "gg", "apk"];
const ttsMessages = ["Fuck you", "Bitch", "Suck dick", "Mother Fucker", "Useless idiot"];


client.on('ready', () => {
    console.log(`Logged in...`);
});

client.on('message', msg => {

    if(msg.author.bot) return;
    if(!msg.content.startsWith(prefix))return;
    const commandBody = msg.content.slice(prefix.length);
    const commands = commandBody.split(" ");
    console.log(commands);
    let isTTS = false;
    let replyMessage;
    if(commands[0].toLowerCase() === "curse"){
        if(commands.length > 1){
            if(commands[1].toLowerCase() === "tts"){
                isTTS = true;
                replyMessage = `${ttsMessages[Math.floor(Math.random() * ttsMessages.length)]} ${commands.reduce((acc, current, index) => {
                    if (index > 1) return acc + " " + current;
                    else return acc;
                }, "")}`;
            }else {
                replyMessage = `${curseWords[Math.floor(Math.random() * curseWords.length)]} ${commands.reduce((acc, current, index) => {
                    if (index > 0) return acc + " " + current;
                    else return acc;
                }, "")}`;
            }
        }else {
            replyMessage = `${curseWords[Math.floor(Math.random()*curseWords.length)]} ${msg.author.username}`;
        }

    }
    else if(commands[0].toLowerCase() === "relay"){
        let subject = msg.author.username;
        let object = dcMembers[Math.floor(Math.random()*curseWords.length)];
        if(commands.length > 1){
            if((commands[1].startsWith("\"") && commands[1].endsWith("\"")) || (commands[1].startsWith("'") && commands[1].endsWith("'")))
            subject = commands[1];
        }
        if(commands.length > 2 ){
            if((commands[2].startsWith("\"") && commands[2].endsWith("\"")) || (commands[2].startsWith("'") && commands[2].endsWith("'")))
            object = commands[2];
        }
        replyMessage = `${subject} က ${object} ဆီမှာ ${relayWords[Math.floor(Math.random()*relayWords.length)]}လို့တဲ့`;
    }
    else if(commands[0].toLowerCase() === "noob"){
        if(commands.length > 1){
            replyMessage = `${dontWords[Math.floor(Math.random() * dontWords.length)]} ${commands.reduce((acc, current, index) => {
                if (index > 0) return acc + " " + current;
                else return acc;
            }, "")}`;
        }else {
            replyMessage = `${dontWords[Math.floor(Math.random()*dontWords.length)]} ${msg.author.username}`;
        }
    }
    else if(commands[0].toLowerCase() === "bored"){
        replyMessage = `${dcWords[Math.floor(Math.random()*dcWords.length)]}ရအောင်`;
    }
    if(replyMessage)msg.channel.send(replyMessage, {tts: isTTS});
});

client.login(botToken);
