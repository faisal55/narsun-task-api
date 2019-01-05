const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const settingSchema = Schema({

    setting1: { type: String },
    setting2: { type: String },
    setting3: { type: String },
    setting4: { type: String },
    
}, { timestamps: true}); 

module.exports = mongoose.model('Setting', settingSchema);    