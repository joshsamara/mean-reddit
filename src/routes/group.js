base = require('./base');
module.exports = function(app, models){
    var Group = models.Group;

    // Restful routes
    app.get('/api/group', base.getall(Group));
    app.post('/api/group', base.create(Group));
    app.post('/api/group/many', base.getmany(Group));
    app.get('/api/group/:id', base.getone(Group));
    app.delete('/api/group/:id', base.delete(Group));

    // Find by name
    app.get('/api/group/name/:name', base.getByName(Group, 'name'));

    // [Un]Subscribe to a group
    app.get('/api/group/:id/subscribe', base.auth, base.addToUser(Group, 'groups'));
    app.get('/api/group/:id/unsubscribe', base.auth, base.removeFromUser(Group, 'groups'));

};
