//Import NPM modules
var express = require('express');
var app = express();

//Import other modules

//Set up static paths
app.use(express.static('../public'));

//Start server
app.set('port', 3000);
var server = app.listen(app.get('port'), function()
{
    var port = server.address().port;
    console.log('Listening on port ' + port + '...');
});

//Gets
app.get('/', function(req, res)
{
    res.sendFile('index.html');
});

app.get('/getMonths', function(req, res)
{
    var months = ['January 2016', 'December 2015', 'November 2015'];
    
    res.send(months);
});

app.get('/getPosts', function(req, res)
{
    
});
