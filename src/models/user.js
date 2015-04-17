var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, index: { unique: true }, required: true},
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    created: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('User', UserSchema);
