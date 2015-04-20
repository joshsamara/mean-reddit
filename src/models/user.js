var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
// User passport-local-mongose for slightly cleaner
// and more secure User management
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    created: { type: Date, default: Date.now, required: true },
    roles: [String]
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(random);

module.exports = mongoose.model('User', UserSchema);
