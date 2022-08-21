const { EmbedBuilder, InteractionType, Discord } = require("discord.js")
const Setup = require("../schemas/setupData")
const Guild = require("../schemas/guildData")
const Emojies = require("../../emojies.json")
const { ButtonBuilder } = require("@discordjs/builders")
/**@param {Discord.Client} client
 * @param {Discord.interactionCreate} interactionCreate
 */

 module.exports = async (interaction) => {

const setupData = await Setup.findOne({guildID: interaction.guild.id})
const guildData = await Guild.findOne({guildID: interaction.guild.id})
if (interaction.type === InteractionType.MessageComponent) {
if (interaction.customId === "yardim") {
interaction.reply({content: 
`Set-Up (**Kurulum**) yardım menüsü!
        
        
- \`\`Names:\`\`
        
• Default Name: **.setup defaultName** \`\`<Default Name>\`\`
• Guild Name: **.setup guildName** \`\`<Guild Name>\`\`
• Confirmation Name: **.setup confirmationName** \`\`<Confirmation Name>\`\`
        
- \`\`Roles\`\`
        
• Man Roles: **.setup manRoles** \`\`<Man Roles>\`\`
• Woman Roles: **.setup womanRoles** \`\`<Woman Roles>\`\`
• Unregistered Roles: **.setup unregRoles** \`\`<Unregistered Rolleri>\`\`
• Fake Accounnt Role**.setup fakeAccRole** \`\`<Fake Account Role>\`\`
• Bot Commands Roles: **.setup botCommands** \`\`<Bot Commands Roles>\`\`
• Register Staff Roles: **.setup registerStaff** \`\`<Register Staff Roles>\`\`
        
- \`\`Channels:\`\`
        
• Welcome Channel: **.setup welcomeChannel** \`\`<Welcome Channel>\`\`
• Rules Channel: **.setup rulesChannel** \`\`<Rules Channel>\`\`
• Fake Acc Log: **.setup fakeAccLog** \`\`<Fake Acc Log>\`\`
• Tag Log: **.setup fakeAccLog** \`\`<Tag Log>\`\`
        
- \`\`Other Roles\`\`
        
• Taggest Role: **.setup taggestRole** \`\`<Taggest Role>\`\`
• Booster Role: **.setup boosterRole** \`\`<Booster Role>\`\`
• VIP Role: **.setup vipRole** \`\`<VIP Role>\`\`
        
- \`\`Tags:\`\`
- Name Tags: **.setup nameTag [ekle/kaldır/liste]** \`\`<TAG>\`\`
- Discriminator Tag: **.setup discriminator** \`\`<0000>\`\``, ephemeral:true})
}

if (interaction.customId === "durum") { 
interaction.reply({content: `Set-Up (**Kurulum**) durum menüsü!


- \`\`Names:\`\`
    
• Default Name: ${setupData.defaultName ? `\`\` ${setupData.defaultName}\`\`` : `\`\`Kurulmamış.\`\``}
• Guild Name: ${setupData.guildName ? `\`\`${setupData.guildName}\`\`` : `\`\`Kurulmamış.\`\``}
• Confirmation Name: ${setupData.confirmationName ? `\`\`${setupData.confirmationName}\`\`` : `\`\`Kurulmamış.\`\``}
    
- \`\`Roles:\`\`
    
• Man Roles: ${setupData.manRoles.length > 0 ? setupData.manRoles.reverse().map(x => `<@&${x}>`).join(" **|** ") : `\`\`Kurulmamış.\`\``}
• Woman Roles: ${setupData.womanRoles.length > 0 ? setupData.womanRoles.reverse().map(x => `<@&${x}>`).join(" **|** ") : `\`\`Kurulmamış.\`\``}
• Unregistered Roles: ${setupData.unregisteredRoles.lentgh > 0 ? setupData.unregisteredRoles.reverse().map(x => `<@&${x}>`).join(" **|** ") : `\`\`Kurulmamış.\`\``}
• Fake Accounnt Role: ${setupData.fakeAccRole ?`<@&${setupData.fakeAccRole}>` : `\`\`Kurulmamış.\`\``}
• Bot Commands Roles: ${setupData.botCommands.length > 0 ? setupData.botCommands.reverse().map(x => `<@&${x}>`).join(" **|** ") : `\`\`Kurulmamış.\`\``}
• Register Staff Roles: ${setupData.registerStaff.length > 0 ? setupData.registerStaff.reverse().map(x => `<@&${x}>`).join(" **|** ") : `\`\`Kurulmamış.\`\``}
    
- \`\`Channels:\`\`
    
• Welcome Channel: ${setupData.welcomeChannel ?`<#${setupData.welcomeChannel}>` : `\`\`Kurulmamış.\`\``}
• Rules Channel: ${setupData.rulesChannel ?`<#${setupData.rulesChannel}>` : `\`\`Kurulmamış.\`\``}
• Fake Acc Log: ${setupData.fakeAccLog ?`<#${setupData.fakeAccLog}>` : `\`\`Kurulmamış.\`\``}
• Tag Log: ${setupData.tagLog ?`<#${setupData.tagLog}>` : `\`\`Kurulmamış.\`\``}
    
- \`\`Other Roles:\`\`
    
• Taggest Role: ${setupData.taggestRole ?`<@&${setupData.fakeAccRole}>` : `\`\`Kurulmamış.\`\``}
• Booster Role: ${setupData.boosterRole ?`<@&${setupData.boosterRole}>` : `\`\`Kurulmamış.\`\``}
• VIP Role: ${setupData.vipRole ?`<@&${setupData.vipRole}>` : `\`\`Kurulmamış.\`\``}
    
- \`\`Tags:\`\`
    
• Name Tags: ${setupData.tags.length > 0 ? setupData.tags.reverse().map(x => `**${x}**`).join(" **|** ") : `\`\`Hiçbir isim tagı kurulmamış.\`\``}
• Discriminator Tags: ${setupData.disc ? `**#${setupData.disc}**` : `\`\`Hiçbir etiket tagı kurulmamış.\`\``}`, ephemeral:true})
}
/*if (interaction.customId === "tagmc") {
    interaction.update({embeds:[new EmbedBuilder().setColor("#00001").setDescription(`${Emojies.Green} Taglı Alım modu başarıyla \`\`deaktif\`\` duruma getirildi!`)], components: [interaction.components.tagmc.setDisabled(true)], ephemeral: true})
    guildData.taglıAlım = false
    guildData.save()
}
if (interaction.customId === "tagmo") {
    interaction.update({embeds:[new EmbedBuilder().setColor("#00001").setDescription(`${Emojies.Green} Taglı Alım modu başarıyla \`\`aktif\`\` duruma getirildi!`)], ephemeral: true})
    guildData.taglıAlım = true
    guildData.save()
}
if (interaction.customId === "tagmt") {
    const tags = setupData.tags ? setupData.tags.reverse().map(((value) => `**${value}**`)).join(" **|** ") : "Sunucu tagı bulunmuyor!"
    const etiket = setupData.disc ? setupData.disc : "Sunucu etiketi bulunmuyor!"
    interaction.reply({content: `• İsim tagları: ${tags}\n\n • Etiket Tagı: #**${etiket}**`, ephemeral: true})
    }*/
}}
