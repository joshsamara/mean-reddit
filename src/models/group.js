var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: { type: String, index: { unique: true }},
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Group', GroupSchema);
