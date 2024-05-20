const Discord = require('discord.js');

module.exports = {

    name: "kick",
    description: "Permet de kick un membre du serveur",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à kick de ce serveur",
            required: true,
        }, {
            type: "string",
            name: "raison",
            description:"Raison du kick",
            required: false,
        }
    ],

    async run(run, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.channel.send("Il n'y a pas de membre à kick")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.channel.send("Il n'y a pas de membre à kick")
        
        let reason = args.getString("raison")
        if(!reason) reason = "La raison n'a pas été donné"

        if(message.user.id === user.id) return message.channel.send("Tu ne peut pas te kick toi-même")
         if((await message.guild.fetchOwner()).id === user.id) return message.channel.send("Tu ne peut pas kick <@846410539885658142>")
        if(member && !member.kickable) return message.channel.send("Ce membre n'est pas kickable")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas kick un membre qui a un rôle plus haut ou égal au tiens")
            
        await member.kick(reason)
            
        try {await user.send(`Bonjour, tu a été kick sur le serveur ${message.guild.name} pour la/les raison(s) suivante : \`${reason}\``)} catch(err) {}
         await message.channel.send(`Le membre ${user.tag} à été kick de ${message.guild.name} par le Staff ${message.user} pour la raison \`${reason}\``)
        
    }
}