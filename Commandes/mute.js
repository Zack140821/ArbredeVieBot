const Discord = require("discord.js");
const ms = require('ms');

module.exports = {

    name: "mute",
    description: "Permet de mute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "membre a mute",
            required: true,
        }, {
            type: "string",
            name: "temps",
            description: "temps en minute a mute",
            required: true,
        }, {
            type: "string",
            name: "raison",
            description: "raison du mute",
            required: false,
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre à mute")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre a mute")

        let time = args.getString("temps")
        if(!time) return message.reply("Il n'y a pas de temps")
        if(isNaN(ms(time))) return message.reply("Ce n'est pas le bon format")
        if(ms(time) > 2419200000) return message.reply("Le mute ne peut durer plus de 28j")

        let reason = args.getString("raison")
        if(!reason) reason = "La raison n'a pas été donnée";
        if(message.user.id === user.id) return message.reply("Tu ne peut pas te mute toi-même")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peut pas mute <@846410539885658142>")
        if(!member.moderatable) return message.reply("Ce membre ne peut pas être mute")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas mute un membre qui a un rôle plus haut ou égal au tiens")
        if(member.isCommunicationDisabled()) return message.reply("Ce membre est déjà mute")

        await member.timeout(ms(time), reason)
            
        try {await user.send(`Bonjour, \n tu a été mute sur le serveur \`${message.guild.name}\` pour la durée de \`${time}\` pour la/les raison(s) suivante : \`${reason}\``)} catch(err) {}
         await message.channel.send(`Le membre ${user.tag} à été mute sur ${message.guild.name} par le Staff ${message.user} pour la durée de ${time} pour la raison \`${reason}\``)
        

    }
}