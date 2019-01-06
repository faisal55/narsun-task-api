const mongoose   = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema     = mongoose.Schema;

const userSchema = Schema({

  firstName: { type: String },
  lastName:  { type: String },
  device:    { type: mongoose.Schema.Types.ObjectId, ref: 'Device'}

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
