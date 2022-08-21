const Setup = require("../schemas/setupData")
const conf = require("../../config.json")
const client = global.client;
const Emojies = require("../../emojies.json")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")

/**@param {Discord.Client} client
 * @param {Discord.guildMemberAdd} guildMemberAdd
 */
module.exports = async (member) => {
const setupData = await Setup.findOne({guildID: conf.Bot.GuildID})

const welcomeCh = member.guild.channels.cache.get(setupData.welcomeChannel)
const fakeAccCh = member.guild.channels.cache.get(setupData.fakeAccLog) 
const rulesCh = member.guild.channels.cache.get(setupData.rulesChannel)

if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
fakeAccCh.send({content:`${member} kullanıcısı sunucuya katıldı fakat hesabı ${moment(member.user.createdTimestamp).fromNow()}  tarihinde açıldığı için onu şüpheliye attım.`})
member.send({content: `Selam ${member}, naber ya? Neyse sadede gelelim. Sunucumuza katıldın fakat hesabın ${moment(member.user.createdAt).format("LLL")} tarihinde açıldığı için seni şüpheliye attım. Hata yaptığımızı düşünüyorsan sunucu sahiplerine ulaş!`})
member.roles.set([setupData.fakeAccRole])
return
}
welcomeCh.send({content: 
`:tada: ${member} **${setupData.guildName}'e** hoş geldin! Sunucumuz seninle beraber **${member.guild.members.cache.size}** kişi oldu!

Hesabın <t:${Math.floor(member.user.createdTimestamp / 1000)}> tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) oluşturulmuş! (Güvenli ${Emojies.Green})

Sol tarafta bulunan **${setupData.confirmationName}** kanallarına girerek kayıt olabilirsin.

Kurallarımız <#${setupData.rulesChannel}> kanalında belirtilmiştir. Unutma ki üzerine uygulayacağımız ceza-i işlemler kuralları okuduğun varsayılarak yapılacaktır!`})
member.roles.add([...setupData.unregisteredRoles])
if ([...setupData.tags, setupData.disc].some(x => member.user.tag.includes(x))) return member.roles.add(setupData.taggestRole)
}