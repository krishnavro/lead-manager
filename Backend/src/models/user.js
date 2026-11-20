const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    phone: {type: Number, required: true, trim: true},
    password: {type: String, required: true},


},{timestamps:true});

const userModel = mongoose.model("User",userSchema)

module.exports = userModel