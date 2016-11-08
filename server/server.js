//Import NPM modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Import other modules

//Set up modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    console.log(req.query.month);

    if(req.query.month == 'January 2016')
    {
        var posts = [{ id: 32, name: 'Example 1' }, { id: 21, name: 'Example 2' }, { id: 3, name: 'Example 3' }];
    }
    else
    {
        var posts = [{ id: 14, name: 'Example 4' }, { id: 80, name: 'Example 5' }, { id: 33, name: 'Example 6' }];
    }

    res.send(posts);
});
