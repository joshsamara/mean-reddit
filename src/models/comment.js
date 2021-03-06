var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    text: {type: String, requred: true},
    score: { type: Number, required: true, default: 0},
    created: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);
