module.exports = {
        TOKEN: 'OTM4NTIwNDg0NTYyMjE0OTYy.YfrfUA.CIcTVso9T8EMWFRYwn92awgZihU', //your discord bot token
        px: '-',
        playing: 'mf gostoso music',

    opt: {
        DJ: {
            enabled: false, //se for usar o cargo de DJ meter um true aq.
            roleName: 'DJ', //nome do cargo de DJ
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume'] //se mexer é gay
        },
        maxVol: 250, //Volume máximo.
        loopMessage: false, //se mexer é gay
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio', //se mexer é gay
                highWaterMark: 1 << 25 //se mexer é gay
            }
        }
    }
};
