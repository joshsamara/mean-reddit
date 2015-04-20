base = require('./base');
module.exports = function(app, models, passport){
    var User = models.User;

    // Restful routes
    app.get('/api/user', base.getall(User));
    app.get('/api/user/:id', base.getone(User));
    app.post('/api/user/many', base.getmany(User));
    app.delete('/api/user/:id', base.delete(User));

    // Discovery posts
    app.get('/api/user/discover/random', base.oneRandom(User));
    app.get('/api/user/discover/new', base.oneNew(User));

    // Find by name
    app.get('/api/user/name/:name', base.getByName(User, 'username'));

    app.post("/login", passport.authenticate('local'), function(req, res) {
        res.json(req.user);
    });

    app.get("/logout", function(req, res) {
        req.logout();
        res.sendStatus(200);
    });

    app.get("/loggedin", function(req, res){
        res.send(req.isAuthenticated() ? req.user : 0);
    });

    app.post('/register', function(req, res) {
        User.register(new User({ username : req.body.username }),
            req.body.password,
            function(err, user) {
                if (err) {
                    res.status(400);
                    res.json(err);
                } else{
                    passport.authenticate('local')(req, res, function () {
                        res.json(user);
                    });
                }
            });
    });

    // Friend users
    app.get('/api/user/:id/friend', base.auth, base.addToUser(User, 'friends'));
    app.get('/api/user/:id/unfriend', base.auth, base.removeFromUser(User, 'friends'));


    // Get these resources bound to a user
    app.get('/api/user/:id/comment', function(req, res){
      var id = req.params.id;
      models.Comment.find( { user: id }, function(err, data){
        if (err) {
          res.sendStatus(400);
          res.send(err);
        } else {
          res.json(data);
        }
      });
    });

    app.get('/api/user/:id/post', function(req, res){
      var id = req.params.id;
      models.Post.find( { user: id }, function(err, data){
        if (err) {
          res.sendStatus(400);
          res.send(err);
        } else {
          res.json(data);
        }
      });
    });
};
