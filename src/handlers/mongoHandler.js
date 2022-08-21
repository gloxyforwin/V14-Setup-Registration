const mongoose = require("mongoose")
const config = require("../../config.json")
module.exports = function (client) {

mongoose.connect(config.Bot.MongoURL,
{
useNewUrlParser: true,
useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
console.log("[DB] Mongoose bağlantısı kuruldu!");

})
}
