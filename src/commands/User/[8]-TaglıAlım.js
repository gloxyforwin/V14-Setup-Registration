const Setup = require("../../schemas/setupData")
const Guild = require("../../schemas/guildData")

const Emojies = require("../../../emojies.json")

const { ButtonBuilder } = require("@discordjs/builders")
const { ButtonStyle, ActionRowBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js")
module.exports = {
    name: 'taglıalım',
    description: 'Sunucu için ayarlamalar komutu.',
    aliases: ['tagmode'],
    usage: '.setup',
    cooldown: 1,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
async execute(message, args, client, embedm) {

const guildData = await Guild.findOne({guildID: message.guild.id})

const setupData = await Setup.findOne({guildID: message.guild.id})
if(!guildData) new Guild({guildID: message.guild.id, taglıAlım: false}).save();
const closeButton = new ButtonBuilder()
.setCustomId("tagmc")
.setLabel("Kapat")
.setStyle(ButtonStyle.Danger)

const openButton = new ButtonBuilder()
.setCustomId("tagmo")
.setLabel("Aç")
.setStyle(ButtonStyle.Success)

const tagButton = new ButtonBuilder()
.setCustomId("tagmt")
.setLabel("Gözden Geçir!")
.setStyle(ButtonStyle.Primary)

const row = new ActionRowBuilder().addComponents(openButton, closeButton, tagButton)
if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
return;
}

message.channel.send({embeds: [embedm.setDescription(`Taglı Alım modu şuanda ${guildData.taglıAlım ? "\`\`aktif\`\`" : "\`\`deaktif\`\`"} durumda. Aşağıda ki butonları kullanarak taglıalım modunu düzenleyebilirsiniz, sunucu taglarınızı gözden geçirmek için ise yeşil butonu kullanabilirsiniz.`)], components: [row]}).then(x => {
const filt = x => x.user.id === message.author.id
const clc = x.createMessageComponentCollector({filter: filt, time: 3000000})
clc.on("collect", async (r) => {

if (r.customId === "tagmc") {
    r.reply({embeds:[new EmbedBuilder().setColor("#00001").setDescription(`${Emojies.Green} Taglı Alım modu başarıyla \`\`deaktif\`\` duruma getirildi!`)], ephemeral:true})
    guildData.taglıAlım = false
    guildData.save()
}
if (r.customId === "tagmo") {
    r.reply({embeds:[new EmbedBuilder().setColor("#00001").setDescription(`${Emojies.Green} Taglı Alım modu başarıyla \`\`aktif\`\` duruma getirildi!`)], ephemeral:true})
    guildData.taglıAlım = true
    guildData.save()
}
if (r.customId === "tagmt") {
    const tags = setupData.tags ? setupData.tags.reverse().map(((value) => `**${value}**`)).join(" **|** ") : "Sunucu tagı bulunmuyor!"
    const etiket = setupData.disc ? setupData.disc : "Sunucu etiketi bulunmuyor!"
    r.reply({content: `• İsim tagları: ${tags}\n\n • Etiket Tagı: #**${etiket}**`, ephemeral: true})
}
})
})
}}