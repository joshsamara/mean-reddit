base = require('./base');
module.exports = function(app, models, passport){
    var User = models.User;

    // Restful routes
    app.get('/api/user', base.getall(User));
    app.get('/api/user/:id', base.getone(User));
    app.post('/api/user/many', base.getmany(User));
    app.delete('/api/user/:id', base.delete(User));

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
};
