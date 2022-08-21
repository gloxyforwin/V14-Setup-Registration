const Setup = require("../../schemas/setupData")
const Emojies = require("../../../emojies.json")
const { PermissionsBitField } = require("discord.js")
module.exports = {
    name: 'kayıtsız',
    description: 'Sunucu için ayarlamalar komutu.',
    aliases: ['unregister'],
    usage: '.kayıtsız <User>',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
async execute(message, args, client, embedm) {

const setupData = await Setup.findOne({guildID: message.guild.id})

if (![...setupData.botCommands, ...setupData.registerStaff].some(x => message.member.roles.cache.has(x)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.react(Emojies.Red)

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if (!member) return message.channel.send({content: `${Emojies.Red} Geçerli bir **kullanıcı** belirtmelisiniz!`})
if ([...setupData.unregisteredRoles].some(x => member.roles.cache.has(x))) return message.channel.send({content: `${Emojies.Red} Bu kullanıcı zaten kayıtlı değil!`})
if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({content: `${Emojies.Red} Bu kullanıcının rolleri **size eşit** veya **sizden yüksek**!`})
if (member.user.id === message.guild.ownerId) return message.channel.send({content: `${Emojies.Red} Sunucu sahibini kayıtsıza atamazsınız!`})

member.roles.set([...setupData.unregisteredRoles])
message.channel.send({embeds: [embedm.setDescription(`${Emojies.Green} ${member} kullanıcısı başarıyla kayıtsıza atıldı!`)]})
member.setNickname(setupData.defaultName)
}}