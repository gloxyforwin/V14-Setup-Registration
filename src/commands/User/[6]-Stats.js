const Setup = require("../../schemas/setupData")
const Name = require("../../schemas/nameData")
const Register = require("../../schemas/registerData")
const Emojies = require("../../../emojies.json")
const { PermissionsBitField } = require("discord.js")
module.exports = {
    name: 'stats',
    description: 'Belirttiğiniz kullanıcının isim geçmişini görüntüleyin.',
    aliases: ['teyitlerim', 'teyitler', 'me'],
    usage: '.stats',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
async execute(message, args, client, embedm) {

const member = args.length > 0 ? message.mentions.members.first() || message.guild.members.cache.get(args[0]) : message.member
const setupData = await Setup.findOne({guildID: message.guild.id})
const registerData = await Register.findOne({guildID: message.guild.id, staff: member.id})

if (![...setupData.botCommands, ...setupData.registerStaff].some(x => message.member.roles.cache.has(x)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.react(Emojies.Red)
if (!registerData.totalRegs > 0) return message.channel.send({embeds: [embedm.setDescription(`${member} kullanıcısının veritabanımda kayıt bilgisi bulunmuyor!`)]})
message.channel.send({embeds: [embedm.setDescription(`${member} kullanıcısının toplam \`\`${registerData.totalRegs}\`\` kayıtı bulunuyor! (\`\`${registerData.manRegs}\`\` erkek,\`\`${registerData.womanRegs}\`\` kadın.)`)]})


}}