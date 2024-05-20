const Discord = require("discord.js");
const ms = require('ms');

module.exports = {

    name: "unmute",
    description: "Permet de unmute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "membre a unmute",
            required: true,
        }, {
            type: "string",
            name: "raison",
            description: "raison du unmute",
            required: false,
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre");
        if (!user) return message.reply("Pas de membre a unmute")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre a unmute")

        let reason = args.getString("raison")
        if(!reason) reason = ("pas de raison fournie")

        if(!member.moderatable) return message.reply("Cette personne ne peut être unmute")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas unmute un membre plus haut ou égal à toi !")
        if(!member.isCommunicationDisabled()) return message.reply("Tu ne peut pas unmute une personne qui n'est pas/plus mute")

        try {await user.send(`Vous avez été unmute de ${message.guild.name} par ${message.user.tag} pour la raison ${reason}`)} catch (err) {}

        await message.reply(`${user.tag} à été unmute par ${message.user} pour la raison ${reason}`)

        await member.timeout(null, reason)
        

    }
}