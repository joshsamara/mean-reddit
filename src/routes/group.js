base = require('./base');
module.exports = function(app, models){
    var Group = models.Group;

    // Restful routes
    app.get('/api/group', base.getall(Group));
    app.post('/api/group', base.auth, function(req, res){
        new_item = Group(req.body);
        new_item.save(function(err, data){
            if (err) {
                res.status(400);
                res.json(err);
            } else {
                res.status(201);
                // Auto subscribe to groups you make
                req.user.groups.push(data._id);
                req.user.save(function(err, data){
                    res.json(data);
                });
            }
    });

    });
    app.post('/api/group/many', base.getmany(Group));
    app.get('/api/group/:id', base.getone(Group));
    app.delete('/api/group/:id', base.delete(Group));
    app.get('/api/group/:name/posts', function(req, res){
        var name = req.params.name;
        Group.findOne({ name: name }, function(err, data){
            if (err || !data){
                res.status(400);
                res.json({"message": "Unable to find group"});
            } else {
                models.Post.find({ 'group': data._id }, function(err, data){
                    if (err){
                        res.status(400);
                        res.json(err);
                    } else {
                        data = data.sort([['score', 'descending']]);
                        res.json(data);
                    }
                });
            }
        });
    });
    // Find by name
    app.get('/api/group/name/:name', base.getByName(Group, 'name'));

    // [Un]Subscribe to a group
    app.get('/api/group/:id/subscribe', base.auth, base.addToUser(Group, 'groups'));
    app.get('/api/group/:id/unsubscribe', base.auth, base.removeFromUser(Group, 'groups'));

};
