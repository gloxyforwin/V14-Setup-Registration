const mongoose = require("mongoose")

let registerData = new mongoose.Schema({

    guildID: String,
    staff: String,
    manRegs: {type: Number, default: 0},
    womanRegs: {type: Number, default: 0},
    totalRegs: {type: Number, default: 0},

    taglıAlım: {type: Boolean, default:false}

})

module.exports = mongoose.model("registerData", registerData)