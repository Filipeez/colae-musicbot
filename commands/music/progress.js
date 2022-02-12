const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'progress',
    aliases: ['time', 'tempo', 'progresso'],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        const semMusica = new MessageEmbed()
            .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
            .setColor('AQUA')
            .setTimestamp(new Date())
    
        const erro1 = new MessageEmbed()
            .setDescription(`${message.author}, não foi possível reproduzir a mídia atual. A mesma é uma live, logo, não é possível exibir a sua duração.`)
            .setColor('AQUA')
            .setTimestamp(new Date())
        
        if (!queue || !queue.playing) return message.channel.send({embeds: [semMusica]});

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send({embeds: [erro1]});

        message.channel.send(`${progress} (**${timestamp.progress}**%)`);
    },
};