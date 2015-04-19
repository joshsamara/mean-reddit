base = require('./base');
module.exports = function(app, models){
    var Post = models.Post;

    // Restful routes
    app.get('/api/post', base.getall(Post));
    app.post('/api/post', base.create(Post));
    app.get('/api/post/:id', base.getone(Post));
    app.delete('/api/post/:id', base.delete(Post));

    // Gets top posts. Filters by subscribed if we have subscribed
    app.get('/api/post/many/top', function(req, res){
      if (req.user && req.user.groups){
        q = Post.find({'group': { $in: req.user.groups }});
      } else{
        q = Post.find();
      }
        q.sort({ 'score': -1 }).limit(100);
        q.exec(function(err, data) {
            if (err || !data) {
                res.status(404);
                res.json({"message": "Object with that name doesn't exist"});
            } else {
                res.json(data);
            }
        });
    });

    // Make a new comment (requires auth)
    app.post('/api/post/:id/comment', base.auth, function(req, res){
        var postId = req.params.id;
        var text = req.body.text;
        var userId = req.user._id;
        newComment = models.Comment({ user: userId, post: postId, text: text});
        newComment.save(function(err, data){
            if (err) {
                res.sendStatus(400);
            } else {
                res.json(data);
            }
        });
    });

    // Get all currently existing comments
    app.get('/api/post/:id/comment', function(req, res){
        var postId = req.params.id;
        models.Comment.find({ post: postId }, function(err, data){
            if (err){
                res.sendStatus(404);
            } else {
                res.json(data);
            }
        });
    });
};
