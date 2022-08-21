const Setup = require("../../schemas/setupData")
const Emojies = require("../../../emojies.json")
const config = require("../../../config.json")
const { PermissionsBitField } = require("discord.js")
module.exports = {
    name: 'reload',
    description: 'Sunucu için ayarlamalar komutu.',
    aliases: ['restart'],
    usage: '.setup',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
async execute(message, args, client, embedm) {

if (!config.Bot.OwnersID.includes(message.author.id)) {
message.react(Emojies.Red)
return
}

message.channel.send({content: `Bot yeniden başlatılıyor...`}).then(x => {
console.log(`Bot yeniden başlatıldı!`)
process.exit(3)
})
}}