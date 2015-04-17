var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    name: { type: String, index: { unique: true }},
    created: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Group', GroupSchema);
