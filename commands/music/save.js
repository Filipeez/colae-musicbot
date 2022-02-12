module.exports = {
    name: 'save',
    aliases: ['salvar'],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

    const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
        .setColor('AQUA')
        .setTimestamp(new Date())

  if (!queue || !queue.playing) return message.channel.send({embeds: [semMusica]});

        message.author.send(`Música salva: **${queue.current.title}** | ${queue.current.author}, Servidor: **${message.guild.name}** ✅`) .then(() => {
            message.channel.send(`Lhe enviei o nome da música em sua DM. ✅`);
        }).catch(error => {
            message.channel.send(`${message.author}, Habilita a porra da DM seu BURRO. ❌`);
        });
    },
};