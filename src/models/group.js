var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: { type: String, index: { unique: true }, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    created: { type: Date, default: Date.now, required: true }
});

GroupSchema.plugin(random);

module.exports = mongoose.model('Group', GroupSchema);
