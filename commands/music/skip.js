const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['s', 'prox', 'proxima'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {

        const semMsc = new MessageEmbed()
            .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
            .setColor('AQUA')
            .setTimestamp(new Date())

        const queue = client.player.getQueue(message.guild.id);
 
        if (!queue || !queue.playing) return message.channel.send({embeds: [semMsc]});

        const success = queue.skip();

        const skipou = new MessageEmbed()
        .setDescription(success ? `A música: **${queue.current.title}**, foi pulada com suceso.` : `${message.author}, deu ruim fml`)
        .setColor('AQUA')
        .setTimestamp(new Date())

        return message.channel.send({embeds: [skipou]});
    },
};