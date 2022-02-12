const { time } = require('console');
const { channel } = require('diagnostics_channel');
const { Player } = require('discord-player');
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');

let client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer);
client.commands = new Collection();
const player = client.player

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};
console.log(`-> Loaded commands...`);
readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`${command.name.toLowerCase()} Load Command!`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
});

client.on('message', message=>{
    if (message.author.bot) return;
    if (message.author == "285547573991833600"){
        const eb = new MessageEmbed()
            .setDescription(`Um otárinho tentou falar no chat mas está banido hihihihii
            
            Otário: ${message.author}
            ID do otário: **${message.author.id}**
            Canal: **${message.channel}**

            Mensagem:

            \` ${message.content} \`
            
            `)
            .setTimestamp(new Date())
            .setColor('AQUA')

        const channel = client.channels.cache.find(channel => channel.id === '940742662892445716')
        channel.send({embeds: [eb]})
        message.delete()
    }

})

player.on('error', (queue, error) => {
    console.log(`Algum problema com a fila => ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Estou tendo dificuldades em me conectar => ${error.message}`);
});

player.on('trackStart', (queue, track) => {

    const trackStart = new MessageEmbed()
        .setColor('GREEN')
        .setTimestamp(new Date())
        .setDescription(`🎵 Começando a tocar: **${track.title}** 
        
        Duração: **${track.duration}**
        
        `)
        

    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send({embeds: [trackStart]});
});

player.on('trackAdd', (queue, track) => {

    const trackAdd = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`A música: **${track.title}** foi adicionada à fila.`)
        .setTimestamp(new Date())
        
    queue.metadata.send({embeds: [trackAdd]});
});

player.on('botDisconnect', (queue) => {

    const botDisconnect = new MessageEmbed()

        .setColor('RED')
        .setDescription('Algum filha da puta que não tem o que fazer me kickou ou me moveu do canal de áudio, parando de tocar a música.')
        .setTimestamp(new Date())

    queue.metadata.send({embeds: [botDisconnect]});
});

player.on('channelEmpty', (queue) => {

    const channelEmpty = new MessageEmbed()
        .setColor('RED')
        .setDescription('Estou deixando o canal de voz pois não tem nenhum viado ouvindo música no momento.')
        .setTimestamp(new Date())

    queue.metadata.send({embeds: [channelEmpty]});
});

player.on('queueEnd', (queue) => {

    const queueEnd = new MessageEmbed()
        .setColor('GOLD')
        .setDescription('A fila de músicas chegou ao fim.')
        .setTimestamp(new Date())

    queue.metadata.send({embeds: [queueEnd]});
});



if(client.config.TOKEN){
client.login(client.config.TOKEN).catch(e => {
console.log("Problema no TOKEN ou Intents mal configurado.")
})
} else {
console.log("De um bisu no token do bot em 'config.js'.")
}
