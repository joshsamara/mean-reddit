base = require('./base');
module.exports = function(app, models, passport){
    var User = models.User;

    // Restful routes
    app.get('/api/user', base.getall(User));
    // app.post('/api/user', base.create(User));
    app.get('/api/user/:id', base.getone(User));
    app.delete('/api/user/:id', base.delete(User));

    app.post("/login", passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });

    app.get("/logout", function(req, res) {
        req.logout();
        res.json({ message: "Logged out" });
    });

    app.get("/loggedin", function(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
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
};
