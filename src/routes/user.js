base = require('./base');
module.exports = function(app, models){
    var User = models.User;

    // Restful routes
    app.get('/api/user', base.getall(User));
    app.post('/api/user', base.create(User));
    app.get('/api/user/:id', base.getone(User));
    app.delete('/api/user/:id', base.delete(User));

};
