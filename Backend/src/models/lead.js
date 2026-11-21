const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    phone: {type: String, required: true},
    company: {type:String, required: true, trim: true},
    source:{type:String, required: true, trim: true},
    status: {type:String,
         required: true,
         enum: ['New','Contacted','Qualified','Lost'],
          default: 'New'},
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

const leadModel = mongoose.Model('Lead', LeadSchema);

module.exports= {leadModel};