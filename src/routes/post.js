base = require('./base');
module.exports = function(app, models){
    var Post = models.Post;

    // Restful routes
    app.get('/api/post', base.getall(Post));
    app.post('/api/post', base.create(Post));
    app.get('/api/post/:id', base.getone(Post));
    app.delete('/api/post/:id', base.delete(Post));

};
