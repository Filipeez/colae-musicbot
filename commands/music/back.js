const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'back',
    aliases: ['voltar'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
        .setColor('AQUA')
        .setTimestamp(new Date())

        const cannotBack = new MessageEmbed()
        .setDescription(`${message.author}, não foi possível retornar a música anterior pois não há nenhuma música anterior a que está sendo reproduzida neste momento.`)
        .setColor('AQUA')
        .setTimestamp(new Date())

        const anterior = new MessageEmbed()
        .setDescription(`Tocando a música anterior...`)
        .setColor('AQUA')
        .setTimestamp(new Date())

        if (!queue || !queue.playing) return message.channel.send({embeds: [semMusica]});

        if (!queue.previousTracks[1]) return message.channel.send({embeds: [cannotBack]});

        await queue.back();

        message.channel.send({embeds: [anterior]});
    },
};