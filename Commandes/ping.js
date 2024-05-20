const Discord = require("discord.js");

module.exports = {

    name: "ping",
    description: "Permet d'avoir la latence (ping) du bot",
    permission: "Aucune",
    dm: true,
    category: "Utilitaires",

    async run(bot, message) {

        await message.reply(`Ping : \`${bot.ws.ping}\``)
    }
}