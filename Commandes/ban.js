const Discord = require('discord.js');

module.exports = {

    name: "ban",
    description: "Permet de bannir un membre du serveur",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre ou Id de l'utilisateur à Bannir de ce serveur",
            required: true,
        }, {
            type: "string",
            name: "raison",
            description:"Raison du Ban",
            required: false,
        }
    ],

    async run(bot, message, args) {

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.channel.send("Il n'y a pas de membre à ban")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison")
            if(!reason) reason = "La raison n'a pas été donné"

            if(message.user.id === user.id) return message.reply("Tu ne peut pas te ban toi-même")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peut pas bannir <@846410539885658142>")
            if(member && !member.bannable) return message.reply("Ce membre n'est pas banissable")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas bannir un membre qui a un rôle plus haut ou égal au tiens")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déjà banni")
            
            await message.guild.bans.create(user.id, {reason: reason})
            
            try {await user.send(`Bonjour, tu a été banni(e) de ${message.guild.name} pour la/les raison(s) suivante : \`${reason}\``)} catch(err) {}

            await message.reply(`Le membre ${user.tag} à été banni de ${message.guild.name} par le Staff ${message.user} pour la raison \`${reason}\``)
        
        } catch (err) {
            return message.reply(`Une erreur est survenu. Veuillez réessayer ultérieurement.`)
            }
    }
}