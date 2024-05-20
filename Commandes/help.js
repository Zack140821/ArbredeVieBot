const Discord = require("discord.js");

module.exports = {

    name: "help",
    description: "Permet d'avoir la latence (ping) du bot",
    permission: "Aucune",
    dm: true,
    category: "Utilitaires",
    options: [
        {
            type: "string",
            name: "commande",
            description: "Permet d'afficher de l'aide sur une certaine commande",
            required: false
        },
    ],

    async run(bot, message, args) {

        let command;
        if(args.getString("commande")) {
            command = bot.commands.get(args.getString("commande"));
            if(!command) return message.reply("Pas de Commande")
        }

        if(!command) {

            let categories = [];
            bot.commands.forEach(command => {
                if(categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle("Help - Commande du Bot")
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Commande disponibles : \`${bot.commands.size}\`\nCatégories disponibles : \`${categories.length}\``)
            .setTimestamp()
            .setFooter({text: "Commande du Bot"})
            console.log(categories)

            await categories.sort().forEach(async cat => {

                let commands = bot.commands.filter(cmd => cmd.category === cat)
                console.log(commands)
                Embed.addFields({name: `${cat}`, value: `${commands.map(async cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            })

            await message.reply({embeds: [Embed]})
        }
    }
}