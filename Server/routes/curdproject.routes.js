module.exports = function(app) {
    var Controllers = require('../controller/curdproject.controller');

    app.post('/API/Curdproject/Create', Controllers.Create);
    app.get('/API/Curdproject/List', Controllers.List);
    app.get('/API/Curdproject/Delete/:Id', Controllers.Delete);
    app.post('/API/Curdproject/Update', Controllers.Update);
}