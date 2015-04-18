var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Model to ensure no double-voting on comments
var CVoteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
    value: { type: Number, required: true, default: 0}
});

module.exports = mongoose.model('CVote', CVoteSchema);
