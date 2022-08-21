const Setup = require("../../schemas/setupData")
const Emojies = require("../../../emojies.json")
const config = require("../../../config.json")
const { PermissionsBitField } = require("discord.js")
const { ButtonBuilder } = require("@discordjs/builders")
const { ButtonStyle, ActionRowBuilder, ComponentType  } = require("discord.js")
module.exports = {
    name: 'setup',
    description: 'Sunucu için ayarlamalar komutu.',
    aliases: ['kurulum', 'kur'],
    usage: '.setup',
    cooldown: 1,
    /**@param {Discord.Message} messageCreate
     * @param {Array} args
     * @param {Discord.Client} client
     */

    
async execute(message, args, client, embedm) {

if (!config.Bot.OwnersID.includes(message.author.id)) {
message.react(Emojies.Red)
return
}
const b1 = new ButtonBuilder()
.setLabel("Setup Durum")
.setStyle(ButtonStyle.Danger)
.setCustomId("durum")
const b2 = new ButtonBuilder()
.setLabel("Setup Yardım")
.setStyle(ButtonStyle.Danger)
.setCustomId("yardim")

const buttons = new ActionRowBuilder().addComponents(b2, b1)
const setupData = await Setup.findOne({guildID: message.guild.id})

if (!args[0] || args[0] === "yardım") {
message.channel.send({embeds: [embedm.setDescription(`Setup menüsüne hoş geldiniz! Aşağıda ki butonları kullanarak setup hakkında bilgi alabilir, veya kurulum yapmış olduğunuz setup bilgilerine erişebilirsiniz!\n\n• NOT: **Kurulumu tamamlamadan komutları kullanmayınız.**`)], components: [buttons]})
}


// Man Roles Setup

if (args[0] === "manRoles" || args[0] === "man") {

let manRoles;

if (message.mentions.roles.size >= 1) {

manRoles = message.mentions.roles.map(r => r.id)

} else {

if (!manRoles) return message.channel.send(`${Emojies.Red} **Erkek** rollerini tek bir mesajda belirt!`)

}

await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { manRoles: manRoles } }, { upsert: true })
message.channel.send({content: `${Emojies.Green} **Erkek Rolleri** ${manRoles.map(r => `<@&${r}>`).join(", ")} olarak kuruldu!`})

}

// Woman Roles Setup

if (args[0] === "womanRoles" || args[0] === "woman") {

let womanRoles;
    
if (message.mentions.roles.size >= 1) {
    
womanRoles = message.mentions.roles.map(r => r.id)
    
} else {
    
if (!womanRoles) return message.channel.send(`${Emojies.Red} **Kadın** rollerini tek bir mesajda belirt!`)
    
}
    
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { womanRoles: womanRoles } }, { upsert: true })
message.channel.send({content: `${Emojies.Green} **Kadın Rolleri** ${womanRoles.map(r => `<@&${r}>`).join(", ")} olarak kuruldu!`})
    
}

// Unregistered Roles Setup

if (args[0] === "unregRoles" || args[0] === "unreg") {

let unregRoles;
        
if (message.mentions.roles.size >= 1) {
        
unregRoles = message.mentions.roles.map(r => r.id)
        
} else {
        
if (!unregRoles) return message.channel.send(`${Emojies.Red} **Kayıtsız** rollerini tek bir mesajda belirt!`)
        
}
        
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { unregisteredRoles: unregRoles } }, { upsert: true })
message.channel.send({content: `${Emojies.Green} **Kayıtsız Rolleri** ${unregRoles.map(r => `<@&${r}>`).join(", ")} olarak kuruldu!`})
        
}

// Fake Account Role Setup

if (args[0] === "fakeAccRole" || args[0] === "şüpheli") {

let fakeAccRole = message.mentions.roles.first()
                                
if (!fakeAccRole) {
message.channel.send({content: `${Emojies.Red} **Şüpheli** rolünü tek bir mesajda belirt!`})
return
}

await message.channel.send(`${Emojies.Green} **Şüpheli** rolleri <@&${fakeAccRole.id}> olarak kuruldu!`)
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { fakeAccRole: fakeAccRole.id } }, { upsert: true }) 
}

// Welcome Channel Setup

if (args[0] === "welcomeChannel" || args[0] === "welcomeCh") {

let welcomeChannel = message.mentions.channels.first()
                                    
if (!welcomeChannel) {
message.channel.send({content: `${Emojies.Red} **Hoşgeldin** kanalını tek bir mesajda belirt!`})
return
}
    
await message.channel.send(`${Emojies.Green} **Hoşgeldin** kanalı <#${welcomeChannel.id}> olarak kuruldu!`)
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { welcomeChannel: welcomeChannel.id } }, { upsert: true }) 
}

// Welcome Channel Setup

if (args[0] === "rulesChannel" || args[0] === "rulesCh") {

let rulesChannel = message.mentions.channels.first()
                                        
if (!rulesChannel) {
message.channel.send({content: `${Emojies.Red} **Kurallar** kanalını tek bir mesajda belirt!`})
return
}
        
await message.channel.send(`${Emojies.Green} **Kurallar** kanalı <#${rulesChannel.id}> olarak kuruldu!`)
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { rulesChannel: rulesChannel.id } }, { upsert: true }) 
}

// Fake Account Log Channel Setup

if (args[0] === "fakeAccLog" || args[0] === "fakeAccCh") {

let fakeAccLog = message.mentions.channels.first()
                                            
if (!fakeAccLog) {
message.channel.send({content: `${Emojies.Red} **Şüpheli Log** kanalını tek bir mesajda belirt!`})
return
}
            
await message.channel.send(`${Emojies.Green} **Şüpheli Log** kanalı <#${fakeAccLog.id}> olarak kuruldu!`)
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { fakeAccLog: fakeAccLog.id } }, { upsert: true }) 
}

if (args[0] === "tagLog" || args[0] === "taglog") {

let tagLog = message.mentions.channels.first()
                                                
if (!tagLog) {
message.channel.send({content: `${Emojies.Red} **Tag Log** kanalını tek bir mesajda belirt!`})
return
}
                
await message.channel.send(`${Emojies.Green} **Tag Log** kanalı <#${tagLog.id}> olarak kuruldu!`)
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { tagLog: tagLog.id } }, { upsert: true }) 
}
    
// Bot Commands Roles Setup

if (args[0] === "botCommands" || args[0] === "botkomut") {

let botCommands;
    
if (message.mentions.roles.size >= 1) {
    
botCommands = message.mentions.roles.map(r => r.id)
    
} else {
    
if (!botCommands) return message.channel.send(`${Emojies.Red} **Bot Commands** rollerini tek bir mesajda belirt!`)
    
}
    
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { botCommands: botCommands } }, { upsert: true })
message.channel.send({content: `${Emojies.Green} **Bot Commands** ${botCommands.map(r => `<@&${r}>`).join(", ")} olarak kuruldu!`})

}
    
// Register Staff Roles Setup

if (args[0] === "registerStaff" || args[0] === "register") {

let registerStaff;
        
if (message.mentions.roles.size >= 1) {
        
registerStaff = message.mentions.roles.map(r => r.id)
        
} else {
        
if (!registerStaff) return message.channel.send(`${Emojies.Red} **Register Staff** rollerini tek bir mesajda belirt!`)
        
}
        
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { registerStaff: registerStaff } }, { upsert: true })
message.channel.send({content: `${Emojies.Green} **Register Staff** ${registerStaff.map(r => `<@&${r}>`).join(", ")} olarak kuruldu!`})
    
}

// Taggest Role Setup

if (args[0] === "taggestRole" || args[0] === "taglırol") {

let taggestRole = message.mentions.roles.first()
                                        
if (!taggestRole) {
message.channel.send({content: `${Emojies.Red} **Taggest** rolünü belirt!`})
return
}
        
await message.channel.send(`${Emojies.Green} **Taggest** rolü <@&${taggestRole.id}> olarak kuruldu!`)
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { taggestRole: taggestRole.id } }, { upsert: true }) 
}

// Booster Role Setup

if (args[0] === "boosterRole" || args[0] === "booster") {

let boosterRole = message.mentions.roles.first()
                                            
if (!boosterRole) {
message.channel.send({content: `${Emojies.Red} **Booster** rolünü belirt!`})
return
}
            
await message.channel.send(`${Emojies.Green} **Booster** rolü <@&${boosterRole.id}> olarak kuruldu!`)
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { boosterRole: boosterRole.id } }, { upsert: true }) 
}

// VIP Role Setup

if (args[0] === "vipRole" || args[0] === "vip") {

let vipRole = message.mentions.roles.first()
                                                
if (!vipRole) {
message.channel.send({content: `${Emojies.Red} **VIP** rolünü tek bir mesajda belirt!`})
return
}
                
await message.channel.send(`${Emojies.Green} **VIP** rolünü <@&${vipRole.id}> olarak kuruldu!`)
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { vipRole: vipRole.id } }, { upsert: true }) 
}

// Guild Name Setup

if (args[0] === "guildName" ) {

let guildName = args.slice(1).join(" ")
                            
if (!guildName) {
message.channel.send({content: `${Emojies.Red} **Sunucu Adını** tek bir mesajda belirt!`})
return
}
await message.channel.send(`${Emojies.Green} **Sunucu Adı** \`\`${guildName}\`\` olarak kuruldu!`)
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { guildName: guildName } }, { upsert: true }) 
}

// Default Name Setup

if (args[0] === "defaultName" ) {

let defaultName = args.slice(1).join(" ")
                                
if (!defaultName) {
message.channel.send({content: `${Emojies.Red} **Kayıtsız** kullanıcıların ismini tek bir mesajda belirt!`})
return
}
await message.channel.send(`${Emojies.Green} **Kayıtsız** kullanıcıların isimi \`\`${defaultName}\`\` olarak kuruldu!`)
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { defaultName: defaultName } }, { upsert: true }) 
}

// Confirmation Name Setup

if (args[0] === "confirmationName" ) {

let confirmationName = args.slice(1).join(" ")
                                    
if (!confirmationName) {
message.channel.send({content: `${Emojies.Red} **Ses Teyit** kanallarının ismini tek bir mesajda belirt!`})
return
}
await message.channel.send(`${Emojies.Green} **Ses Teyit** kanallarının isimi \`\`${confirmationName}\`\` olarak kuruldu!`)
await Setup.findOneAndUpdate({ guildID: message.guild.id }, { $set: { confirmationName: confirmationName } }, { upsert: true }) 
}

// Server Tags Setup

if (args[0] === "tag") {
if (!["ekle", "add", "sil", "çıkar", "remove", "kaldır", "list", "liste"].includes(args[1])) return message.channel.send({content:`${Emojies.Red} Komudu yanlış kullandınız! Doğru kullanım: \`\`\`.setup tag [ekle/kaldır/liste]\`\`\``})
if (args[1] === "ekle" || args[1] === "add") {
    if (!args[2]) return message.channel.send({content: `${Emojies.Red} Geçerli bir **isim tagı** belirtmelisiniz!`})
    if (setupData.tags.includes(args[2])) return message.channel.send({content: `${Emojies.Red} \`\`${args[2]}\`\` tagı sunucu taglarında zaten bulunuyor!`})
    const filtered = await message.guild.members.cache.filter((gloxy) => gloxy.user.username.includes(args[2]) && !gloxy.user.bot)
    const ts = filtered.size
    filtered.forEach(x => {
    x.roles.add(setupData.taggestRole)
    })
    message.channel.send({embeds: [embedm.setDescription(`${Emojies.Green} \`\`${args[2]}\`\` tagı başarıyla sunucu taglarına eklendi ve isminde \`\`${args[2]}\`\` tagını bulunduran \`\`${ts}\`\` kişiye <@&${setupData.taggestRole}> rolü alındı!`)]})
    await Setup.findOneAndUpdate({guildID: message.guild.id}, {$push: {tags: args[2]}}, {upsert:true})
}
if (args[1] === "sil" || args[1] === "çıkar" || args[1] === "kaldır" || args[1] === "remove") {
    if (!args[2]) return message.channel.send({content: `${Emojies.Red} Geçerli bir **isim tagı** belirtmelisiniz!`})
    if (!setupData.tags.includes(args[2])) return message.channel.send({content: `${Emojies.Red} \`\`${args[2]}\`\` tagı sunucu taglarında bulunmuyor!`})
    await Setup.findOneAndUpdate({guildID: message.guild.id}, {$pull: {tags: args[2]}}, {upsert:true})

const filtered = message.guild.members.cache.filter((gloxy) => gloxy.user.username.includes(args[2]) && !gloxy.user.bot)
const ts = filtered.size

filtered.forEach(x => {
    x.roles.remove(setupData.taggestRole)
})
message.channel.send({embeds: [embedm.setDescription(`${Emojies.Green} \`\`${args[2]}\`\` tagı başarıyla sunucu taglarından çıkarıldı ve isminde \`\`${args[2]}\`\` tagını bulunduran \`\`${ts}\`\` kişinin üzerinden <@&${setupData.taggestRole}> rolü alındı!!`)]})
}
if (args[1] === "list" || args[1] === "liste") {
    if (!setupData.tags.length > 0) return message.channel.send({content: `${Emojies.Red} Veritabanında hiç tag bulunmuyor!`})
    const tags = setupData.tags.map(((value, index) => `\`\`• ${index + 1}:\`\` **${value}**`)).join("\n")
    message.channel.send({embeds: [embedm.setDescription(`${Emojies.Green} Veritabanımda bu sunucuya ait \`\`${setupData.tags.length}\`\` adet isim tagı bulunuyor; \n\n ${tags}`)]})
}
}

if (args[0] === "etiket" || args[0] === "discriminator") {

const onayB = new ButtonBuilder()
.setLabel("Onaylıyorum.")
.setCustomId("onayButton")
.setStyle(ButtonStyle.Success)
const row = new ActionRowBuilder().addComponents(onayB)
let tag = args[1]
if (!tag) return message.channel.send({content: `${Emojies.Red} Geçerli bir etiket tagı belirtmelisiniz!`})
if (tag.length != 4 || !Number(tag)) return message.channel.send({content: `${Emojies.Red} Veritabanına eklemek istediğiniz **etiket** tagını \`\`#\`\` olmadan \`\`4\`\` haneli bir şekilde belirtmelisiniz!`})

if (setupData.disc) {
message.channel.send({content: `Şuanda veritabanımda \`\`#${setupData.disc}\`\` etiketi kurulu (**${message.guild.members.cache.filter(gloxy => gloxy.user.discriminator.includes(setupData.disc) && !gloxy.user.bot).size}** taglı), değiştirmek istediğine emin misin?`, components: [row]}).then(async (msg) => {
const i = x => x.user.id === message.author.id
const collector = msg.createMessageComponentCollector({type: ComponentType.Button, time: 300000})
collector.on("collect", async (row) => {
if (row.customId === "onayButton") {
const oldFilter = message.guild.members.cache.filter(gloxy => gloxy.user.discriminator.includes(setupData.disc) && !gloxy.user.bot && !gloxy.roles.cache.has(setupData.taggestRole))
row.reply({content: `Sunucu etiketiniz başarıyla \`\`#${tag}\`\` olarak değiştirildi ve \`\`${oldFilter.size}\`\` kişiye <@&${setupData.taggestRole}> rolü verildi!`})
await Setup.findOneAndUpdate({guildID: message.guild.id}, {$set: {disc: tag}}, {upsert:true})
const newFilter = message.guild.members.cache.filter(gloxy => gloxy.user.discriminator.includes(setupData.disc) && !gloxy.user.bot && !gloxy.roles.cache.has(setupData.taggestRole))
newFilter.forEach(x => {
x.roles.add(setupData.taggestRole)
})
}
})
})
return
}

const filtered = message.guild.members.cache.filter((gloxy) => gloxy.user.discriminator.includes(tag) && !gloxy.user.bot)
filtered.forEach(x => {
x.roles.add(setupData.taggestRole)
})
message.channel.send({embeds:[embedm.setDescription(`${Emojies.Green} \`\`#${args[1]}\`\` etiketi başarıyla sunucu etiketi olarak ayarlandı ve \`\`#${args[1]}\`\` etiketini taşıyan \`\`${filtered.size}\`\` kişiye <@&${setupData.taggestRole}> rolü verildi!`)]})
await Setup.findOneAndUpdate({guildID: message.guild.id}, {$set: {disc: tag}}, {upsert:true})
}
}} 

