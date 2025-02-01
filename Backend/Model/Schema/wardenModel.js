const mongoose = require("mongoose")

const wardenSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Warden', wardenSchema)