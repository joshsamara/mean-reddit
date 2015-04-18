module.exports = function(app, models){
    // Search on Posts, Groups, and Users
    function search(model, field){
        return function(req, res){
            var term = req.params.term;
            query = [];
            query[field] = new RegExp(term, 'i');
            model.find(query, function(err, data){
                res.json(data);
            });
        };
    }

    app.get('/api/search/user/:term', search(models.User, 'username'));
    app.get('/api/search/group/:term', search(models.Group, 'name'));
    app.get('/api/search/post/:term', search(models.Post, 'title'));
};
