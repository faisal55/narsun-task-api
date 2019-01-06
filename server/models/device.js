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

// This pre hook will remove the link between device's refenced user before getting removed.
deviceSchema.pre('remove', function(next) {
    var device = this;
    device.model('User').update(
        { device: device._id }, 
        { $unset: { device: 1 } }, 
        { multi: true },
        next);
});

module.exports = mongoose.model('Device', deviceSchema);