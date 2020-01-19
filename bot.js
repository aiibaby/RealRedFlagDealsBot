var Discord = require('discord.io');
var logger = require('winston');
require('dotenv').config()

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = "debug";

// Initialize Discord Bot
var bot = new Discord.Client({
    token: process.env.BOT_TOKEN,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info("Logged in as: ");
    logger.info(bot.username + ' - (' + bot.id + ')');
})
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a commond
    // It will listen for message that will start with `!`
    if (message.substring(0, 1) == "?") {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                })
                break;
            case 'hello':
                bot.sendMessage({
                    to: channelID,
                    message: "Hi"
                })
                break;
            case 'yonghan':
                bot.sendMessage({
                    to: channelID,
                    message: "Memebot"
                })
                break;
            case 'yonghanemoji':
                bot.sendMessage({
                    to: channelID,
                    message: "<:yongsleep:646474825317220425>"

                })

        }
    }

    if (message.startsWith('?kick')) {
        var args = message.substring(5).trim().split(" ");
        var member = args[0];

        if (args.includes('')) {
            bot.sendMessage({
                to: channelID,
                message: `Who are you trying to kick? You must mention a user.`
            })
        } else {
            args.forEach(kickfunction)

            function kickfunction(value) {
                if (!value.kickable) {
                    bot.sendMessage({
                        to: channelID,
                        message: `I can't kick this user ${value}. Sorry!`
                    })
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: "Do it by yourself, bitch!!!"
                    })
                }
            }

        }
    }
})
