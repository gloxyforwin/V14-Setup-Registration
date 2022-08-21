const Setup = require("../../schemas/setupData")
const Name = require("../../schemas/nameData")
const Guild = require("../../schemas/guildData")
const Emojies = require("../../../emojies.json")
const { PermissionsBitField } = require("discord.js")
module.exports = {
    name: 'isim',
    description: 'Belirttiğiniz kullanıcının isim geçmişini görüntüleyin.',
    aliases: ['name'],
    usage: '.isim <User> <Name>',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
async execute(message, args, client, embedm) {

const setupData = await Setup.findOne({guildID: message.guild.id})
const guildData = await Guild.findOne({guildID: message.guild.id})
if (![...setupData.botCommands, ...setupData.registerStaff].some(x => message.member.roles.cache.has(x)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.react(Emojies.Red)


const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
const name = args[1]
const age = args[2]
if (!member) return message.channel.send({content: `${Emojies.Red} Geçerli bir **kullanıcı** belirtmelisiniz!`})
if (!name) return message.channel.send({content: `${Emojies.Red} Geçerli bir **isim** belirtmelisiniz!`})

if (age) {
if (!Number(age)) return message.channel.send({content: `${Emojies.Red} Geçerli bir **yaş** belirtmelisiniz!`})
if (age < 14 ) return message.channel.send({content: `$${member} kullanıcısının yaşı 14'ten küçük olduğu için kayıt işlemini yapamadım.`})
if (age > 50) return message.channel.send({content: ` Bu arkadaş ölmeyi unutmuş sanırım.`}) 
}
let newNickname = age ? `• ${name[0].toUpperCase() + name.substring(1)} | ${age}` : `${name[0].toUpperCase() + name.substring(1)}`

if (guildData.taglıAlım == true) {
if (!member.roles.cache.has(setupData.taggestRole) && !member.roles.cache.has(setupData.boosterRole)) return message.channel.send({content: `${Emojies.Red} Bu kullanıcın **isminde sunucu tagımız bulunmadığı** ve **sunucumuza basmış olduğu takviye bulunmadığı için** kayıt işlemini durdurdum!`})
}


const nameData = await Name.findOne({guildID: message.guild.id, member: member.id})
const names = nameData ? nameData.names.reverse().map(((value, index) => `\`\`${index + 1}.\`\` \`\`${value.name}\`\` (${value.roles}) - <@${value.executor}>`)).join("\n") : `\`\`\`Kullanıcının isim geçmişi bulunamadı.\`\`\``

member.setNickname(newNickname)
message.channel.send({embeds: [embedm.setDescription(`${Emojies.Green} ${member} kullanıcısınının isimi \`\`${newNickname}\`\` olarak değiştirildi! Kişinin eski isimleri aşağıda yer alıyor.\n\n${names}`)]})
await Name.findOneAndUpdate({guildID: message.guild.id, member: member.id}, {$push: {names: {name: newNickname, roles: "İsim Değiştirme", executor: message.author.id}}}, {upsert:true})

}}