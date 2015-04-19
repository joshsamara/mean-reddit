var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Model to ensure no double-voting on posts
var PVoteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    value: { type: Number, required: true, default: 0}
});

// Only one vote per person!
PVoteSchema.index({ user: 1, post: 1 }, { unique: true });

module.exports = mongoose.model('PVote', PVoteSchema);
