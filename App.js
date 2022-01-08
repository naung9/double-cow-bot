import {Client} from "discord.js";
import fetch from "node-fetch";
const client = new Client();
const botToken = process.env.DISCORD_BOT_TOKEN;

const prefix = "!";
const curseWords = ["လီးပဲ", "ငါလိုးမသား", "မအေလိုး", "ကိုမေကိုလိုး", "စောက်ရူး", "နွား", "စောက်သုံးမကျ"];
const relayWords = ["ဖင်ချချင်", "ဖင်ခံချင်"];
const dcWords = ["ဖာတန်းသွား", "ဖဲသွားရိုက်", "အကင်သွားစား", "Hot Pot သွားစား", "ဖာသွားချ"];
const dontWords = ["မပေနဲ့", "မထုံနဲ့", "လီးစကားမပြောနဲ့", "လီးလီးလားလားမလုပ်နဲ့" ];
const dcMembers = ["ထုံကြီး", "ပေါက်ကြီး", "ကုလား", "ထောရှန်", "အေဇက်", "gg", "apk"];
const ttsMessages = ["Fuck you", "Bitch", "Suck dick", "Mother Fucker", "Useless idiot"];
const dotaIDs = {
    "htaw shan": 125328838,
    "april": 125328838,
    "gg": 99386945,
}
let dotaHeros = [];
fetch("https://api.opendota.com/api/heroes").then(async response => {
    console.log("Heros Retrieved");
    dotaHeros = await response.json();
});

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
    else if (commands[0].toLowerCase() === "dota"){
        if(commands.length > 1){
            const [command, ...params] = commands;
            let dotaId = params.join(" ");
            console.log(dotaId);
            dotaId = !isNaN(dotaId) ? dotaId : dotaIDs[dotaId.toLowerCase()];
            console.log(dotaId);
            if(!isNaN(dotaId)) {
                fetch(`https://api.opendota.com/api/players/${dotaId}/recentMatches`).then(async response => {
                    if (dotaHeros.length > 0) {
                        const recentMatches = (await response.json()).slice(0, 5);
                        console.log(recentMatches.length);
                        let message = "";
                        for (let i = 0; i < recentMatches.length; i++) {
                            const result = recentMatches[i];
                            try {
                                const match = await (await fetch(`https://api.opendota.com/api/matches/${result["match_id"]}`)).json();
                                const playerInfo = match.players.find(player => player["account_id"] && player["account_id"].toString() === dotaId.toString());
                                const started = new Date(result["start_time"] * 1000).toLocaleString("en-US", {timeZone: "Asia/Yangon"});
                                const ended = new Date((result["start_time"] + result["duration"] || 0) * 1000).toLocaleString("en-US", {timeZone: "Asia/Yangon"});
                                const duration = Math.floor(result["duration"] / 60) + ":" + (result["duration"] % 60);
                                const hero = dotaHeros.find(hero => hero.id === result["hero_id"])["localized_name"];
                                message += `\n ${playerInfo.win === 1 ? "WON" : "LOST"}${playerInfo.isRadiant ? "(Radiant)" : "(Dire)"}\n Score\t:    ${match["radiant_score"]}${match["radiant_win"] ? "(W)" : "(L)"}:${match["dire_score"]}${match["radiant_win"] ? "(L)" : "(W)"}\n  Start\t:   ${started}\n End\t:   ${ended}\n Duration\t:   ${duration}\n Hero\t:   ${hero}\n K/D/A\t:   ${result["kills"]}/${result["deaths"]}/${result["assists"]}\n GPM\t:   ${result["gold_per_min"]}\n XPM\t:   ${result["xp_per_min"]}\n`;
                            } catch (e) {
                                message += "\nError Retrieving Match Data\n";
                                console.error(message);
                            }
                        }
                        msg.channel.send("This is the result of recent 5 matches.\n" + message);
                    } else {
                        msg.channel.send("Sorry. Unexpected error while retrieving hero data");
                    }
                });
            }else {
                msg.channel.send("Please Type Dota2 Account ID");
            }
        }
    }
    if(replyMessage)msg.channel.send(replyMessage, {tts: isTTS});
});

client.login(botToken);
