const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q', 'fila'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
        const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)

        const semFila = new MessageEmbed()
        .setDescription(`${message.author}, não existe nenhuma música adicionada à fila no momento.`)
 
        if (!queue || !queue.playing) return message.channel.send({embeds: [semMusica]});

        if (!queue.tracks[0]) return message.channel.send({embeds: [semFila]});

        const embed = new MessageEmbed();
        const methods = ['🔁', '🔂'];

        embed.setColor('AQUA');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setTitle(`Fila de reprodução - ${message.guild.name} ${methods[queue.repeatMode]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - **${track.title} | ${track.author}** (Pedido por: <@${track. requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `e **${songs - 5}** outras músicas...` : `Temos **${songs}** músicas adicionadas à fila.`;

        embed.setDescription(`Tocando agora: \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs }`);

        embed.setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};