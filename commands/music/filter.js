const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'filter',
    aliases: ['filtro'],
    utilisation: '{prefix}filter [nome do filtro]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

    const semMusica = new MessageEmbed()
        .setDescription(`${message.author}, nenhuma música está sendo reproduzida no momento.`)
        .setColor('RANDOM')
        .setTimestamp(new Date())

    const semArgs = new MessageEmbed()
        .setDescription(`${message.author}, o pobre, insira um nome váldo para o filtro...
        
        **FILTROS DISPONÍVEIS:**
        
        ➡️ \`'bassbost' - aumenta o grave da música\` 
        ➡️ \`'8D' - ajusta os canais de áudio para deixar a música em 8D\`
        ➡️ \`'nightcore' - aumenta o tom e a velocidade com que a mesma é reproduzida\`

        **COMO USAR:**

        \`!filtro <nome-do-filtro> - O mesmo será aplicado à música que estiver tocando no momento\`
        
        `)
        .setColor('RANDOM') 
        .setTimestamp(new Date())

   if (!queue || !queue.playing) return message.channel.send({embeds: [semMusica]});

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.channel.send({embeds: [semArgs]});

        const filters = [];
        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.channel.send({embeds: [semArgs]});

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        const applied = new MessageEmbed()
            .setDescription(`O filtro para essa fila/música foi aplicado com sucesso.
            
            Filtro aplicado: **${filter}**
            Status: **${queue.getFiltersEnabled().includes(filter) ? 'Ativo' : 'Inativo'}**
            
            \`O filtro se molda à duração da música e/ou se aplica à todas músicas da fila.\`
            `)
            .setColor('AQUA')
            .setTimestamp(new Date())
            
        message.channel.send({embeds: [applied]});
    },
};