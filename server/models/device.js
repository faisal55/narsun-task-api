const mongoose = require('mongoose');
mongoose.set('useCreatedIndex', true);

const Schema = mongoose.Schema;

const deviceSchema = Schema({

    deviceName: String,
    cost: Number,
    expiry: Date,
    warranty: String,
    deviceImage: String,

}, {timestamps: true});

deviceSchema.pre('remove', function(next) {
    var device = this;
    device.model('User').update(
        { device: device._id }, 
        { $unset: { device: 1 } }, 
        { multi: true },
        next);
});

module.exports = mongoose.model('Device', deviceSchema);