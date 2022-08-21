const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const conf = require("../../config.json")

/**@param {Discord.Client} client
 * @param {Discord.ready} ready
 */

 module.exports = async (message,client) => {

const activity = conf.Bot.Activity
client.user.setPresence({activities: [{name: conf.Bot.Activity}], status: conf.Bot.Status})
console.log("[BOT] Bota başarıyla giriş yapıldı!");

    joinVoiceChannel({
      channelId: conf.Bot.VoiceChannelID,
      guildId: conf.Bot.GuildID,
      adapterCreator: client.guilds.cache.get(conf.Bot.GuildID).voiceAdapterCreator
  });
 } 
