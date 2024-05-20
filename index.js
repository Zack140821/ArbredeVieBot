const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const config = require("./config");
const loadCommands = require("./Loaders/loaderCommandes");
const loadEvents = require("./Loaders/loaderEvents");
bot.commands = new Discord.Collection()
bot.login(config.token);

//Load
loadCommands(bot)
loadEvents(bot)

//Tuto YouTube
//épisode: 6 (cmd Mute)
//temps: 0:00

//Dépendance à installer en cas de perte du dossier node_modules:
//discord.js
//@discordjs/rest
//fs
//ms