const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    roll:{
        type: Number,
        required: true,
        trim: true
    },
    phone:{
        type: Number,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps:true
})

const User = new mongoose.model("User", userShema)

module.exports = User