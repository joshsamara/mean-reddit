base = require('./base');
module.exports = function(app, models){

    app.get('/api/post', base.getall(models.Post));

    app.post('/api/post', base.create(models.Post));

    app.get('/api/post/:id', base.getone(models.Post));

    app.delete('/api/post/:id', base.delete(models.Post));

};
