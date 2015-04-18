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

base.auth = function(req, res, next) {
    if (!req.isAuthenticated()){
        res.send(401);
    } else {
        next();
    }
};

module.exports = base;
