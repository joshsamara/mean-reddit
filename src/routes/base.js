// Collection of shared base functions
base = {};

base.getall = function(model){
    return function(req, res){
        model.find(function(err, data) {
            res.json(data);
        });
    };
};

base.getone = function(model){
    return function(req, res) {
        var id = req.params.id;
        model.findById(id, function(err, data) {
            res.json(data);
        });
    };
};

base.create = function(model){
    return function(req, res){
        new_item = model(req.body);
        new_item.save(function(err, data){
            if (err) {
                res.status('400');
                res.json(err);
            } else {
                res.json(data);
            }
        });
    };
};


base.delete = function(model){
    return function(req, res) {
        var id = req.params.id;
        function callback() { base.returnall(req, res); }
        model.findByIdAndRemove(id , callback);
    };
};

module.exports = base;
