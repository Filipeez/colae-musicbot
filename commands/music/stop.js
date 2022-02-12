const { QueryResolver } = require("discord-player");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    aliases: ['parar', 'terminar'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
        .setColor('AQUA')
        .setTimestamp(new Date())

        if (!queue || !queue.playing) return message.channel.send({embeds: [semMusica]});
        message.channel.send(`Desativando mídia 🟢`).then((sentMessage) => sentMessage.edit(`Limpando a fila 🟢🟢`).then((sentMessage) => sentMessage.edit(`Desativando áudio 🟢🟢🟢`)).then((sentMessage) => sentMessage.edit(`A mídia foi desativada e a fila foi limpa, deixando o canal de voz ✅`)).then((sentMessage) => sentMessage.delete()))

        setTimeout(() => {
            queue.destroy();
          }, 2000);
    },
};
