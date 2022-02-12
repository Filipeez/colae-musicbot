const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pause',
    aliases: ['pausar'],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const eb1 = new MessageEmbed()
            .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
            .setColor('AQUA')
            .setTimestamp(new Date())

        const eb2 = new MessageEmbed()
            .setDescription(success ? `A música atual: **${queue.current.title}** foi pausada com sucesso.` : `${message.author}, algo deu errado. ❌`)
            .setColor('AQUA')
            .setTimestamp(new Date())

       if (!queue || !queue.playing) return message.channel.send({embeds: [eb1]});

        const success = queue.setPaused(true);

        return message.channel.send({embeds: [eb2]});
    },
};