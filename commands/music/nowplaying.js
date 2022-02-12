const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np', 'agora', 'tocando', 'atual', 'msc'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
 
 const semMusica = new MessageEmbed()
    .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
    .setColor('AQUA')
    .setTimestamp(new Date())

 if (!queue || !queue.playing) return message.channel.send({embeds: [semMusica]});

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('AQUA');
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title)

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const progress = queue.createProgressBar();

const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

        embed.setDescription(`Volume: **${queue.volume}%**
        Progresso: **${progress}**
        Loop: **${methods[queue.repeatMode]}**
        
        Requisitado por: ${track.requestedBy}`);

        embed.setTimestamp();

        const saveButton = new MessageButton();

        saveButton.setLabel('Salvar som');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        message.channel.send({ embeds: [embed], components: [row] });
    },
};