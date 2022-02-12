module.exports = (client, int) => {
    if (!int.isButton()) return;

    const queue = client.player.getQueue(int.guildId);

    switch (int.customId) {
        case 'saveTrack': {
          if (!queue || !queue.playing) return int.reply({ content: `Nenhuma música tocando no momento. ❌`, ephemeral: true, components: [] });

            int.member.send(`**Música salva: \`${queue.current.title}\` | Postada por \`${queue.current.author}\`, Servidor salvo: \`${int.member.guild.name}\` ✅**`).then(() => {
                return int.reply({ content: `Eu enviei o nome dessa música em sua DM ✅`, ephemeral: true, components: [] });
            }).catch(error => {
                return int.reply({ content: `Não consegui enviar uma mensagem em sua DM, habilita ela ai porra... ❌`, ephemeral: true, components: [] });
            });
        }
    }
};