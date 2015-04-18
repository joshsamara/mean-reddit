// Collection of shared base functions
base = {};

// Constructor for a generic callback function
function callback(res, failure, success) {
    return function(err, data){
        if (err) {
            res.status(failure);
            res.json(err);
        } else {
            if (success) res.status(success);
            res.json(data);
        }
    };
}

// Get everything
base.getall = function(model){
    return function(req, res){
        model.find(callback(res, 404));
    };
};

// Get many, requires a list of IDs in the body
base.getmany = function(model){
    return function(req, res){
        var ids = req.body.ids;
        model.find({
            '_id': { $in: ids }
        }, function(err, data){
            if (err){
                res.status(400);
                res.json(err);
            } else if (!data) {
                res.status(404);
                res.json({"message": "Objects with given ids do not exist"});
            } else {
                res.json(data);
            }
        });
    };
};

base.getByName = function(model, field){
    return function(req, res) {
        var val = req.params.name;
        var query = {};
        query[field] = val;
        console.log(query);
        model.findOne(query, function(err, data){
            if (err || !data) {
                res.status(404);
                res.json({"message": "Object with that name doesn't exist"});
            } else {
                res.json(data);
            }
        });
    };

};

// Get a single thing, requires ID
base.getone = function(model){
    return function(req, res) {
        var id = req.params.id;
        model.findById(id, function(err, data){
            if (err || !data) {
                res.status(404);
                res.json({"message": "Object with that id doesn't exist"});
            } else {
                res.json(data);
            }
        });
    };
};

// Create something
base.create = function(model){
    return function(req, res){
        new_item = model(req.body);
        new_item.save(callback(res, 400, 201));
    };
};

// Delete a single thing, requires ID
base.delete = function(model){
    return function(req, res) {
        var id = req.params.id;
        model.findByIdAndRemove(id, function(err, data) {
            if (err) {
                res.status(400);
                res.json({"message": "Error deleting"});
            } else {
                res.status(200);
                res.json({"message": "Object deleted"});
            }
        });
    };
};

// Abstracted add to user for things like friending and subscribing
base.addToUser = function(model, userField){
    return function(req, res) {
        // We require an id in the params
        var id = req.params.id;
        model.findById(id, function(err, data){
            if (err || !data) {
                res.status(404);
                res.json({"message": "Object with that id doesn't exist"});
            } else {
                if (req.user[userField].indexOf(id) === -1){
                    req.user[userField].push(id);
                    req.user.save();
                }
                res.status(200);
                res.json(req.user);
            }
        });
    };
};

// Inverse of the previous method
base.removeFromUser = function(model, userField){
    return function(req, res) {
        // We require an id in the params
        var id = req.params.id;
        model.findById(id, function(err, data){
            if (err || !data) {
                res.status(404);
                res.json({"message": "Object with that id doesn't exist"});
            } else {
                var index = req.user[userField].indexOf(id);
                if (index != -1){
                    req.user[userField].splice(index, 1);
                    req.user.save();
                }
                res.status(200);
                res.json(req.user);
            }
        });
    };
};


base.auth = function(req, res, next) {
    if (!req.isAuthenticated()){
        res.sendStatus(401);
    } else {
        next();
    }
};

module.exports = base;
