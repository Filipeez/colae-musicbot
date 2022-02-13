module.exports = {
        TOKEN: '', //seu token aqui
        px: '-',
        playing: 'mf gostoso music',

    opt: {
        DJ: {
            enabled: false, //se for usar o cargo de DJ meter um true aq.
            roleName: 'DJ', //nome do cargo de DJ
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume'] //não mexa sem saber o que está fazendo
        },
        maxVol: 250, //Volume máximo.
        loopMessage: false, //não mexa sem saber o que está fazendo
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio', //não mexa sem saber o que está fazendo
                highWaterMark: 1 << 25 //não mexa sem saber o que está fazendo
            }
        }
    }
};
