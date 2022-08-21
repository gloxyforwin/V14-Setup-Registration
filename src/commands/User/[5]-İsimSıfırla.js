const Setup = require("../../schemas/setupData")
const Name = require("../../schemas/nameData")
const Register = require("../../schemas/registerData")
const Emojies = require("../../../emojies.json")
const { PermissionsBitField } = require("discord.js")
module.exports = {
    name: 'isim-sıfırla',
    description: 'Belirttiğiniz kullanıcının isim geçmişini görüntüleyin.',
    aliases: ['isimsil', 'isimsıfırla'],
    usage: '.stats',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
async execute(message, args, client, embedm) {

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
const setupData = await Setup.findOne({guildID: message.guild.id})

if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.react(Emojies.Red)
if (!member) return message.channel.send({content: `${Emojies.Red} Bir kullanıcı belirtmelisin!`})

const nameData = await Name.findOne({guildID: message.guild.id, member: member.id})
if (!nameData) return message.channel.send({content: `${Emojies.Red} ${member} kullanıcısına ait isim verisi bulunmuyor!`})

await Name.deleteMany({guildID: message.guild.id, member: member.id})
message.channel.send({embeds: [embedm.setDescription(`${member} kullanıcısının isim verileri temizlendi!`)]})


}}