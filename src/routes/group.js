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
    app.get('/api/group/name/:name', function(req, res) {
        var name = req.params.name;
        Group.findOne({ name: name }, function(err, data){
            if (err || !data) {
                res.status(404);
                res.json({"message": "Group with that name doesn't exist"});
            } else {
                res.json(data);
            }
        });
    });

    // Subscribe to a group
    app.get('/api/group/:id/subscribe', base.auth, function(req, res) {
        var id = req.params.id;
        Group.findById(id, function(err, data){
            if (err || !data) {
                res.status(404);
                res.json({"message": "Group with that id doesn't exist"});
            } else {
                if (req.user.groups.indexOf(id) === -1){
                    req.user.groups.push(id);
                    req.user.save();
                }
                res.status(200)
                res.json(req.user)
            }
        });
    });

    // Subscribe to a group
    app.get('/api/group/:id/unsubscribe', base.auth, function(req, res) {
        var id = req.params.id;
        Group.findById(id, function(err, data){
            if (err || !data) {
                res.status(404);
                res.json({"message": "Group with that id doesn't exist"});
            } else {
                var index = req.user.groups.indexOf(id);
                if (index != -1){
                    req.user.groups.splice(index, 1);
                    req.user.save();
                }
                res.status(200)
                res.json(req.user)
            }
        });
    });
};
