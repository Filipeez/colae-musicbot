const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['pesquisa', 'busca', 'buscar'],
    utilisation: '{prefix}search [nome-da-musica]',
    voiceChannel: true,

    async execute(client, message, args) {
      
if (!args[0]) return message.channel.send(`${message.author}, Insira um nome válido. ❌`);

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
        .setColor('AQUA')

        if (!res || !res.tracks.length) return message.channel.send({embeds: [semMusica]});

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('AQUA');
        embed.setTitle(`Searched Music: ${args.join(' ')}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nEscolha a música de **1** até **${maxTracks.length}** ou digite **cancelar** para cancelar a seleção.⬇️`);

        embed.setTimestamp();

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancelar') return message.channel.send(`Este processo foi cancelado com sucesso ✅`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Erro: selecione uma música de **1** até **${maxTracks.length}** ou digite **cancelar** para cancelar a seleção. ❌`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                return message.channel.send(`${message.author}, não consigo me juntar ao canal de áudio. ❌`);
            }

            await message.channel.send(`Carregando sua música... 🎧`);

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send(`${message.author}, tempo de busca expirado. ❌`);
        });
    },
};