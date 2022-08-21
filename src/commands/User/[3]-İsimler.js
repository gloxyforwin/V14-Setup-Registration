const Setup = require("../../schemas/setupData")
const Name = require("../../schemas/nameData")
const Emojies = require("../../../emojies.json")
const { PermissionsBitField } = require("discord.js")
module.exports = {
    name: 'isimler',
    description: 'Belirttiğiniz kullanıcının isim geçmişini görüntüleyin.',
    aliases: ['names'],
    usage: '.isimler <User>',
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
const nameData = await Name.findOne({guildID: message.guild.id, member: member.id})

if (!nameData || !nameData.names) return message.channel.send({embeds: [embedm.setDescription(`${Emojies.Red} Veritabanımda ${member} kullanıcısının isim geçmişi bulunmuyor!`)]})
const names = nameData.names.reverse().map(((value, index) => `\`\`${index + 1}.\`\` \`\`${value.name}\`\` (${value.roles}) - <@${value.executor}>`)).join("\n")

message.channel.send({embeds: [embedm.setDescription(`${Emojies.Green} ${member} kullanıcısının **${nameData.names.length > 0 ? nameData.names.length : "0"}** adet isim geçmişi aşağıda listelenmiştir.\n\n${names}`)]})
}}