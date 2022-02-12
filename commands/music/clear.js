const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    aliases: ['limpar'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
        .setColor('AQUA')
        .setTimestamp(new Date())

        const semMusica2 = new MessageEmbed()
        .setDescription(`${message.author}, a fila de reprodução se encontra vazia, portanto, não é possível limpar-lá.`)
        .setColor('AQUA')
        .setTimestamp(new Date())

        const sucesso = new MessageEmbed()
        .setDescription(`🗑️ | A fila foi limpa com sucesso.`)
        .setColor('AQUA')
        .setTimestamp(new Date())

        if (!queue || !queue.playing) return message.channel.send({embeds: [semMusica]});

        if (!queue.tracks[0]) return message.channel.send({embeds: [semMusica2]});

        await queue.clear();

        message.channel.send({embeds: [sucesso]});
    },
};