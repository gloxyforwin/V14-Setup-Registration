const mongoose = require("mongoose")

let guildData = new mongoose.Schema({

    guildID: String,
    taglıAlım: {type: Boolean, default:false}

})

module.exports = mongoose.model("guildData", guildData)