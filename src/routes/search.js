module.exports = function(app, models){
    // Search on Posts, Groups, and Users
    function search(model, field){
        return function(req, res){
            var term = req.param("term");
            query = {};
            query[field] = new RegExp(term, 'i');
            model.find(query, function(err, data){
                if (!data){
                    res.json([]);
                } else {
                    res.json(data);
                }
            });
        };
    }

    app.get('/api/search/user', search(models.User, 'username'));
    app.get('/api/search/group', search(models.Group, 'name'));
    app.get('/api/search/post', search(models.Post, 'title'));
};
