base = require('./base');
module.exports = function(app, models){
    var PVote = models.PVote;

    // Restful routes
    app.get('/api/pvote', base.getall(PVote));
    app.post('/api/pvote', base.create(PVote));
    app.get('/api/pvote/:id', base.getone(PVote));

};
