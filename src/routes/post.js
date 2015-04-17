module.exports = function(app, models){

    // Useful because we do this more than once
    function returnall(req, res){
        models.Post.find(function(err, data) {
            res.json(data);
        });
    }

    app.get('/api/post', function(req, res) {
        returnall(req, res);
    });

    app.post('/api/post/', function(req, res) {
        post = models.Post(req.body);
        post.save();
        res.json(post);
    });

    app.get('/api/post/:id', function(req, res) {
        var id = req.params.id;
        models.Post.findById(id, function(err, data) {
            res.json(data);
        });
    });

    app.delete('/api/post/:id', function(req, res) {
        var id = req.params.id;
        function callback() { returnall(req, res); }
        models.Post.findByIdAndRemove(id , callback);
    });

};
