const { token } = require('./config.json');
const Discord = require("discord.js");
const Scratch = require('new-scratch3-api');

//embeds
const helpPanel = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Scratch API Bot Help')
    .addFields(
        { name: 'User commands', value: '"sa!user <username>"' },
        { name: 'Proxy commands', value: '"sa!featured"'},
    )


const client = new Discord.Client();

client.once('ready', () => {
    console.log('Started OK!');
    client.user.setActivity('for "sa!help"', { type: "WATCHING" });
});

client.login(token);

client.on('message', message => {
    if (message.content.startsWith("sa!")) {
        if (message.content === "sa!help") {
            message.channel.send(helpPanel);
        }

        if (message.content.startsWith("sa!user ")) {
            nep = message.content.split(' ');
            if (nep.length === 2) {
                message.channel.send("Please wait a moment...");

                let data = Scratch.API.users.get(nep[1]);

                setTimeout(function() {
                    let profile = data;
                    console.log(data.username);
                    let userInfo = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`Info on **${nep[1]}**`)
                        .addFields(
                            {name: "About me", value: data, },
                            {name: "What I'm working on", value: profile.status},
                            {name: "Country", value: profile.country},
                        )
                    
                    message.channel.send(userInfo);
                }, 1500)
            } else {
                message.channel.send("Incorrect number of arguments! Example: `sa!user Herbin12`")
            }
        }
    }
});