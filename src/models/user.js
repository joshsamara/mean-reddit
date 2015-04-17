var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, index: { unique: true }, required: true},
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group', required: true }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    created: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('User', UserSchema);
