module.exports = function(app, models){

    app.get('/api/post', function(req, res){
        models.Post.find(function(err, data){
            res.json(data);
        });
    });

};
