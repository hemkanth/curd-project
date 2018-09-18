var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var port = 4000;
var app = express();

// mongoose.connect('mongodb://hemkanth.s:hemkanthS007@ds021356.mlab.com:21356/curdproject');
mongoose.connect('mongodb://hemkanth.s:hemkanthS007@ds135537.mlab.com:35537/curd');

mongoose.connection.on('error', (err) => {
    console.log('DB connection failed ' + err);
});
mongoose.connection.once('open', () => {
    console.log('DB connected successfully');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

require('./Server/routes/curdproject.routes')(app);

app.get('*', function(req, res){
    res.send('this is server page');
});
app.listen(port, function(error, result){
    if(error){
        console.log(error);
    }
    else {
        console.log('Listening to the port' + port);
    }
});