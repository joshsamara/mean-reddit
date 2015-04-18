var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: { type: String, required: true },
    link_post: { type: Boolean, required: true },
    link: { type: String },
    text: { type: String },
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, default: 0},
    created: { type: Date, default: Date.now, required: true }
});

// Conditional validation
PostSchema.pre('validate', function(next) {
    if (this.link_post  && !this.link) {
        this.invalidate('link', 'Link posts require a link');
    } else if (!this.link_post && this.link){
        this.invalidate('link', 'Text posts cannot have a link');
    }
    next();
});

// To make things easy, we always want links with http://
re = /https?:\/\/.*/i;
PostSchema.pre('save', function(next) {
  if (this.link_post && !this.link.match(re)){
    this.link = 'http://' + this.link;
  }
  next();
});
module.exports = mongoose.model('Post', PostSchema);
