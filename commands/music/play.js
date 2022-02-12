const { QueryType } = require('discord-player');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [nome-da-msc / url]',
    voiceChannel: true,

    async execute(client, message, args) {

    const eb1 = new MessageEmbed()
        .setDescription(`${message.author}, escreva o nome de alguma música para que a busca seja feita...`)
        .setColor('AQUA')
        .setTimestamp(new Date())

if (!args[0]) return message.channel.send({embeds: [eb1]});

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        const semresultado = new MessageEmbed()
            .setDescription(`${message.author}, nenhum resultado encontrado, tente utilizar o comando de busca.`)
            .setColor('AQUA')
            .setTimestamp(new Date())

        const erro = new MessageEmbed()
            .setDescription(`${message.author}, não posso me juntar a este canal de voz, veja se o frankie fez merda configurando as permissões...`)
            .setColor('AQUA')
            .setTimestamp(new Date())
        
        const carregando = new MessageEmbed()
            .setDescription(`${res.playlist ? 'Sua playlist' : 'Sua música'} está carregando... 🎧`)
            .setColor('AQUA')
            .setTimestamp(new Date())

        if (!res || !res.tracks.length) return message.channel.send({embeds: [semresultado]});

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id);
            return message.channel.send({embeds: [erro]});
        }

        await message.channel.send({embeds: [carregando]});

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};