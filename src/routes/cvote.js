base = require('./base');
module.exports = function(app, models){
    var CVote = models.CVote;

    // Restful routes
    app.get('/api/cvote', base.getall(CVote));
    app.post('/api/cvote', base.create(CVote));
    app.get('/api/cvote/:id', base.getone(CVote));

};
