const mongoose = require("mongoose")

let setupData = new mongoose.Schema({

    guildID: {type: String, default: ""},
    tags: {type: Array, default: []},
    disc: {type: String, default: ""},

    boosterRole: {type: String, default: ""},
    taggestRole: {type: String, default: ""},
    vipRole: {type: String, default: ""},

    manRoles: { type: Array, default: [] },
    womanRoles: { type: Array, default: [] },
    unregisteredRoles: { type: Array, default: [] },
    fakeAccRole: {type: String, default: ""},

    registerStaff: { type: Array, default: [] },
    botCommands: {type: Array, defauly: []},

    defaultName: {type: String, default: ""},
    guildName: {type: String, default: ""},
    confirmationName: {type: String, default: ""},

    welcomeChannel: {type: String, default: ""},
    rulesChannel: {type: String, default: ""},
    fakeAccLog: {type: String, default: ""},
    tagLog: {type: String, default: ""},
})

module.exports = mongoose.model("setupData", setupData)