const Discord = require("discord.js");
const loadSlashCommand = require("../Loaders/loadSlashCommand");

module.exports = async bot => {

   await loadSlashCommand(bot)

    console.log(`${bot.user.tag} est en ligne 🟢`)
}