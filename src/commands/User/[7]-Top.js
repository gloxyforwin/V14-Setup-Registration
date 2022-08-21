const Setup = require("../../schemas/setupData")
const Name = require("../../schemas/nameData")
const Register = require("../../schemas/registerData")
const Emojies = require("../../../emojies.json")
const { PermissionsBitField } = require("discord.js")

module.exports = {
    name: 'top',
    description: 'Belirttiğiniz kullanıcının isim geçmişini görüntüleyin.',
    aliases: ['topstat', 'topstats'],
    usage: '.stats',
    cooldown: 5,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
async execute(message, args, client, embedm) {

const setupData = await Setup.findOne({guildID: message.guild.id})
const registerData = await Register.find({guildID: message.guild.id})
const topData = registerData.filter(s => message.guild.members.cache.has(s.staff) && s.totalRegs > 0).sort((a, b) => b.totalRegs - a.totalRegs).map((value, index) => `\`${index +1}.\` ${message.guild.members.cache.get(value.staff)} toplam **${value.totalRegs}** kayıt! (**${value.manRegs}** Erkek, **${value.womanRegs}** Kadın. )`).slice(0, 15).join('\n')
if (![...setupData.botCommands, ...setupData.registerStaff].some(x => message.member.roles.cache.has(x)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.react(Emojies.Red)
message.channel.send({embeds: [embedm.setDescription(`**${setupData.guildName}** sunucusuna ait ilk **15** kayıt verisi!\n\n${topData}`)]})


}}