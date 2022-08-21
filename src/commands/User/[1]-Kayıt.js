const Setup = require("../../schemas/setupData")
const Register = require("../../schemas/registerData")
const Guild = require("../../schemas/guildData")
const Name = require("../../schemas/nameData")
const Emojies = require("../../../emojies.json")
const { PermissionsBitField } = require("discord.js")

const { ButtonBuilder } = require("@discordjs/builders")
const { ButtonStyle, ActionRowBuilder } = require("discord.js")
module.exports = {
    name: 'kayıt',
    description: 'Sunucu için ayarlamalar komutu.',
    aliases: ['kayıt', 'e', 'k', 'man', 'woman', 'erkek', 'kadın'],
    usage: '.setup',
    cooldown: 5,
    /**
     * @param {Array} args
     * @param {Discord.Client} client
     */

async execute(message, args, client, embedm) {

const setupData = await Setup.findOne({guildID: message.guild.id})
const guildData = await Guild.findOne({guildID: message.guild.id})

if (![...setupData.botCommands, ...setupData.registerStaff].some(x => message.member.roles.cache.has(x)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.react(Emojies.Red)

const manButton = new ButtonBuilder()
.setLabel("Erkek")
.setStyle(ButtonStyle.Primary)
.setCustomId("manButton")

const womanButton = new ButtonBuilder()
.setLabel("Kadın")
.setStyle(ButtonStyle.Primary)
.setCustomId("womanButton")

const cancelButton = new ButtonBuilder()
.setLabel("İptal")
.setStyle(ButtonStyle.Danger)
.setCustomId("cancelButton")

const buttons = new ActionRowBuilder().addComponents(manButton, womanButton, cancelButton)

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let name = args[1]
let age = args[2]

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

message.channel.send({embeds: [embedm.setDescription(`${Emojies.Green} ${member} kullanıcısının isimi ${newNickname} olarak değiştirildi. Aşağıda ki butonları kullanarak 30 saniye içinde ${member} kullanıcısının cinsiyetini belirtiniz.`)], components: [buttons]}).then(async (msg) => {
await member.setNickname(`${newNickname}`)
const i = x => x.user.id === message.author.id
const collector = msg.createMessageComponentCollector({filter: i, max: 1, time: 30000})

collector.on("collect", async (x) => {
    
if (x.customId === "manButton") {
msg.delete()
msg.channel.send({embeds: [embedm.setDescription(`${member} üyesi başarılı bir şekilde **erkek** olarak kayıt edildi`)]})
await member.roles.set([...setupData.manRoles])
await Register.findOneAndUpdate({guildID: message.guild.id, staff: message.author.id}, {$inc: {totalRegs: 1, manRegs: 1}}, {upsert:true})
await Name.findOneAndUpdate({guildID: message.guild.id, member: member.id}, {$push: {names: {name: newNickname, executor: message.member.id, roles: setupData.manRoles.map(x => `<@&${x}>`).join(" **|** ")}}}, {upsert:true})
if ([...setupData.tags, setupData.disc].some(x => member.user.tag.includes(x))) return member.roles.add(setupData.taggestRole)
return;
}
    
if (x.customId === "womanButton") {
msg.delete()
msg.channel.send({embeds: [embedm.setDescription(`${member} üyesi başarılı bir şekilde **kadın** olarak kayıt edildi`)]})
await member.roles.set([...setupData.womanRoles])
await Register.findOneAndUpdate({guildID: message.guild.id, staff: message.author.id}, {$inc: {totalRegs: 1, womanRegs: 1}}, {upsert:true})
await Name.findOneAndUpdate({guildID: message.guild.id, member: member.id}, {$push: {names: {name: newNickname, executor: message.member.id, roles: setupData.womanRoles.map(x => `<@&${x}>`).join(" **|** ")}}}, {upsert:true})
if ([...setupData.tags, setupData.disc].some(x => member.user.tag.includes(x))) return member.roles.add(setupData.taggestRole)
return;
}
    
if (x.customId === "cancelButton") {
await member.setNickname(setupData.defaultName)   
msg.delete()
message.delete()
x.member.send({embeds: [embedm.setDescription(`${member} üyesini kayıt etme işlemini iptal ettin.`)]})  
}
})
})

}}