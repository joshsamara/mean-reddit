base = require('./base');
module.exports = function(app, models) {
    var Post = models.Post;

    // Restful routes
    app.get('/api/post', base.getall(Post));
    app.post('/api/post', base.create(Post));
    app.get('/api/post/:id', base.getone(Post));
    app.delete('/api/post/:id', base.delete(Post));

    // Discovery posts
    app.get('/api/post/discover/random', base.oneRandom(Post));
    app.get('/api/post/discover/top', function(req, res) {
        Post.find().sort({ score: -1 }).limit(3).exec(base.callback(res, 404));
    });
    app.get('/api/post/discover/new', base.oneNew(Post));

    // Gets top posts. Filters by subscribed if we have subscribed
    app.get('/api/post/many/top', function(req, res) {
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
    app.post('/api/post/:id/comment', base.auth, function(req, res) {
        var postId = req.params.id;
        var text = req.body.text;
        var userId = req.user._id;
        newComment = models.Comment({ user: userId, post: postId, text: text});
        newComment.save(function(err, data) {
            if (err) {
                res.sendStatus(400);
            } else {
                res.json(data);
            }
        });
    });

    // Get all currently existing comments
    app.get('/api/post/:id/comment', function(req, res) {
        var postId = req.params.id;
        models.Comment.find({ post: postId }, function(err, data) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.json(data);
            }
        });
    });

    // Get the logged in users votes for this post
    app.get('/api/post/:id/vote', base.auth, function(req, res) {
        var postId = req.params.id;
        var userId = req.user._id;
        models.PVote.findOne({ post: postId, user: userId }, function(err, data) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.json(data);
            }
        });
    });

    // Create or update a vote for the currently logged in user
    app.post('/api/post/:id/vote', base.auth, function(req, res) {
        var postId = req.params.id;
        var userId = req.user._id;
        var val = req.body.val;

        // Make sure our post actually exists
        Post.findById(postId, function(err, data){
            if (err || !data) {
                res.sendStatus(404);
            } else {
                // Okay, we've got the post we're dealing with
                post = data;
                models.PVote.findOne({ post: postId, user: userId }, function(err, data) {
                    if (err) {
                        res.sendStatus(400);
                        res.json(err);
                    } else if (!data) {
                        // We need to make a new vote
                        vote = models.PVote({ post: postId, user: userId, value: val });
                        post_diff = val;
                    } else {
                        vote = data;
                        post_diff = val - vote.value;
                        vote.value = val;
                    }
                    // Save our new value
                    if (vote){
                        vote.save(function(err, data) {
                            if (err) {
                                res.status(400);
                                res.json(err);
                            } else {
                                // Update our post's score
                                post.score += post_diff;
                                post.save(function(err, data) {
                                    if (err) {
                                        res.sendStatus(400);
                                        res.json(err);
                                    } else {
                                        res.json(vote);
                                    }});}}
                            );}
                });}
        });});
};
