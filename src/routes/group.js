base = require('./base');
module.exports = function(app, models){
    var Group = models.Group;

    // Restful routes
    app.get('/api/group', base.getall(Group));
    app.post('/api/group', base.create(Group));
    app.get('/api/group/:id', base.getone(Group));
    app.delete('/api/group/:id', base.delete(Group));

};
