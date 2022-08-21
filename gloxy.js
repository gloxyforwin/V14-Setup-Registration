const Discord = require("discord.js")
const mongoose = require("mongoose")
const { Client, GatewayIntentBits } = require('discord.js');
const config = require("./config.json")
const client = new Client({
	intents: [98303, 
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
    ]
});

require("./src/handlers/commandHandler")(client)
require("./src/handlers/eventHandler")(client)
require("./src/handlers/mongoHandler")(client)

client.login(config.Bot.Token)

client.on("userUpdate", async (o, n) => {
	
	const member = client.guilds.cache.get("1003625867076964402").members.cache.get(o.id)
	const setup = require("./src/schemas/setupData")
	const data = await setup.findOne({guildID: config.Bot.GuildID})
	const guild = require("./src/schemas/guildData")
	const data2 = await guild.findOne({guildID: config.Bot.GuildID})
	const tags = [data.tags, data.disc]
	const taglog = client.guilds.cache.get("1003625867076964402").channels.cache.get(data.tagLog)
	const aktiftaglı = client.guilds.cache.get("1003625867076964402").members.cache.filter(gloxy => tags.some(x => gloxy.user.tag.includes(x))).size
	//if (o.member.bot) return;
	if (o.tag === n.tag) return;

	if (tags.some(y => !o.tag.includes(y) && n.tag.includes(y))) {
	member.roles.add(data.taggestRole)
	taglog.send({embeds: [new Discord.EmbedBuilder().setColor("#000001").setDescription(
`${o} üyesi  tagımızı alarak aramıza katıldı!
		
• Kişinin Eski Adı: \`\`${o.tag}\`\`
• Kişinin Yeni Adı: \`\`${n.tag}\`\`
		
• Kişinin ID'si: \`\`${n.id}\`\`
		
• Aktif Taglı Sayısı: \`\`${aktiftaglı}\`\``)]})
}
if (tags.some(y => o.tag.includes(y) && !n.tag.includes(y))) {

data2.taglıAlım ? member.roles.set([...data.unregisteredRoles]) : member.roles.remove(data.taggestRole)

taglog.send({embeds: [new Discord.EmbedBuilder().setColor("#000001").setDescription(
`${o} üyesi tagımızı salarak aramızdan ayrıldı!
			
• Kişinin Eski Adı: \`\`${o.tag}\`\`
• Kişinin Yeni Adı: \`\`${n.tag}\`\`
			
• Kişinin ID'si: \`\`${o.id}\`\`
			
• Aktif Taglı Sayısı: \`\`${aktiftaglı}\`\``)]})
}
})
