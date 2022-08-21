const mongoose = require("mongoose")

let nameData = new mongoose.Schema({

    guildID: String,
    member: String,
    names: {type: Array, default: []},

})

module.exports = mongoose.model("nameData", nameData)