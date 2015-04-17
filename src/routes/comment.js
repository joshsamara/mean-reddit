base = require('./base');
module.exports = function(app, models){
    var Comment = models.Comment;

    // Restful routes
    app.get('/api/comment', base.getall(Comment));
    app.post('/api/comment', base.create(Comment));
    app.get('/api/comment/:id', base.getone(Comment));
    app.delete('/api/comment/:id', base.delete(Comment));

};
