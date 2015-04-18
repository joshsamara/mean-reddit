var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: { type: String, required: true },
    link_post: { type: Boolean, required: true },
    text: { type: String },
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, default: 0},
    created: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Post', PostSchema);
