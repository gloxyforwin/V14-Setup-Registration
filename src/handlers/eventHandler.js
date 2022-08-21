module.exports = (client) => {

const requestEvent = (event) => require(`../events/${event}`)
client.on('ready', (ready) => requestEvent('ready')(ready, client))
client.on('messageCreate', (messageCreate) => requestEvent('commandHandler')(messageCreate, client))
client.on('guildMemberAdd', (guildMemberAdd) => requestEvent('guildMemberAdd')(guildMemberAdd, client))
client.on('interactionCreate', (interactionCreate) => requestEvent('interactionCreate')(interactionCreate, client))
//client.on('userUpdate', (userUpdate) => requestEvent('userUpdate')(userUpdate, client))
}