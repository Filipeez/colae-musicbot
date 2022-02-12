const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resume',
    aliases: ['continuar', 'continue', 'despausar', 'unpause'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const semMusica = new MessageEmbed()
            .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
            .setColor('AQUA')
            .setTimestamp(new Date())

        const eb1 = new MessageEmbed()
            .setDescription(success ? `**${queue.current.title}**, a música atual foi despausada. ✅` : `${message.author}, Algo deu errado. ❌`)
            .setColor('AQUA')
            .setTimestamp(new Date())

        if (!queue) return message.channel.send({embeds: [semMusica]});

        const success = queue.setPaused(false);

        return message.channel.send({embeds: [eb1]});
    },
};