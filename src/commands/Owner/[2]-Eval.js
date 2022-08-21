const Setup = require("../../schemas/setupData")
const Emojies = require("../../../emojies.json")
const config = require("../../../config.json")
const { PermissionsBitField } = require("discord.js")
module.exports = {
    name: 'eval',
    description: 'Sunucu için ayarlamalar komutu.',
    aliases: ['hewal', 'kod'],
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
if (!args[0]) return message.channel.send({ content: `Kod belirtilmedi` });

let code = args.join(' ');
function clean(text) {
    if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
    text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
    return text;
    };
        try {
            var evaled = clean(await eval(code));
            if (evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, "Yasaklı komut");
            message.channel.send({
                content: `
          
          \`\`\`${evaled.replace(client.token, "Yasaklı komut")}\`\`\`
          `, code: "js", split: true
            });
        } catch (err) {
            message.channel.send({ content: `${err}`, code: 'js', split: true })
        }
    
    }}