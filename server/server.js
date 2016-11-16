//Import NPM modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

//Import other modules
var blog = require('./modules/blog');

//Set up modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set up static paths
app.use(express.static('../public'));

//Set up database details
var config = require('./config.json');
var dbURL = 'mongodb://' + config.database.ip + ':' + config.database.port + '/' + config.database.name;

//Establish connection to database
var database;
MongoClient.connect(dbURL, function(err, db)
{
    if(err)
    {
        throw err;
    }
    
    database = db;
});

//Start server
app.set('port', 3000);
var server = app.listen(app.get('port'), function()
{
    var port = server.address().port;
    console.log('Listening on port ' + port + '...');
});

/* GETS */
app.get('/', function(req, res)
{
    res.sendFile('index.html');
});

app.get('/getMonths', function(req, res)
{
    //Get list of months for posts
    blog.getMonths(database, function(months)
    {
        res.send(months);
    });
});

app.get('/getPostList', function(req, res)
{
    if(req.query.month)
    {
        blog.getPosts(database, req.query.month, function(err, posts)
        {
            if(err)
            {
                console.log(err);
                res.end();
            }
            else
            {
                if(posts)
                {
                    res.send(posts);
                }
            }
        });
    }
    else
    {
        res.end();
    }
    
    //blog.getPosts(database, month, callback)
    /*if(req.query.month == 'January 2016')
    {
        var posts = [{ id: 32, name: 'Example 1' }, { id: 21, name: 'Example 2' }, { id: 3, name: 'Example 3' }];
    }
    else
    {
        var posts = [{ id: 14, name: 'Example 4' }, { id: 80, name: 'Example 5' }, { id: 33, name: 'Example 6' }];
    }

    res.send(posts);*/
});

app.get('/search', function(req, res)
{
    blog.searchPosts(database, req.query.query, function(results)
    {
        res.send([{ id: 32, name: 'Example 1' }, { id: 80, name: 'Example 2' }]);
    });
});

app.get('/loadPost', function(req, res)
{
    blog.loadPost(database, function(err, result)
    {
        if(err)
        {
            console.log(err);
            res.end();
        }
        else
        {
            if(result)
            {
                res.send(result);
            }
            else
            {
                res.end();
            }
        }
    });
});
/* END OF GETS */

/* POSTS */
app.post('/post', function(req, res)
{
    //Send post to database
    if(req.body.post)
    {
        blog.makePost(database, req.body.post, function(err)
        {
            if(err)
            {
                console.log('Post creation failed with error: ' + err);
                res.send(false);
            }
            else
            {
                console.log('Post successfully added to database.');
                res.send(true);
            }
        });
    }
});

app.post('/sendComment', function(req, res)
{
    //blog.sendComment(database, postID, comment, callback)
});
/* END OF POSTS */
