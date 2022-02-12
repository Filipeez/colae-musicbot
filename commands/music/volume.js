const { MessageEmbed } = require("discord.js");

const maxVol = require("../../config.js").opt.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol', 'v'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

    const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
        .setColor('AQUA')
        .setTimestamp(new Date())
    
    const eb1 = new MessageEmbed()
        .setDescription(`Volume atual: **${queue.volume}** 🔊\n**Para mudar o volume, de \`1\` até \`${maxVol}\` Digite um valor abaixo.**`)
        .setColor('AQUA')
        .setTimestamp(new Date())
    
    const eb2 = new MessageEmbed()
        .setDescription(`${message.author}, o volume para qual você deseja alterar já é o atual.`)
        .setColor('AQUA')
        .setTimestamp(new Date())

    const eb3 = new MessageEmbed()
        .setDescription(`${message.author}, digite um valor entre \`1\` e \`${maxVol}\` para trocar o volume.`)
        .setColor('AQUA')
        .setTimestamp(new Date())

    const eb4 = new MessageEmbed()
        .setDescription(success ? `Volume alterado: **${vol}%**/**${maxVol}** 🔊` : `${message.author}, algo deu errado.`)
        .setColor('AQUA')
        .setTimestamp(new Date())

       if (!queue || !queue.playing) return message.channel.send({embeds: [semMusica]});

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send({embeds: [eb1]});

        if (queue.volume === vol) return message.channel.send({embeds: [eb2]});

        if (vol < 0 || vol > maxVol) return message.channel.send({embeds: [eb3]});

        const success = queue.setVolume(vol);

        return message.channel.send({embeds: [eb4]});
    },
};