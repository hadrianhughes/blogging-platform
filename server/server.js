//Import NPM modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
var device = require('express-device');

//Import other modules
var blog = require('./modules/blog');
var login = require('./modules/login');

//Set up modules
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(device.capture());
app.use(cookieParser());

//Set up static paths
/*app.use(express.static('../public'));*/
app.use('/js', express.static('../public/js'));
app.use('/styles', express.static('../public/styles'));
app.use('/img', express.static('../public/img'));

//Set up database details
var config = require('./cfg/config.json');
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
    res.sendFile('index.html', { root: '../public' });
});

app.get('/getMobile', function(req, res)
{
    res.sendFile('js/mobile.js', { root: '../public' });
});

app.get('/getDesktop', function(req, res)
{
    res.sendFile('js/bundle.js', { root: '../public' });
});

app.get('/getMobileStyle', function(req, res)
{
    res.sendFile('styles/style.css');
});

app.get('/login', function(req, res)
{
    if(req.query.name && req.query.password)
    {
        login.login(req.query.name, req.query.password, function(err, successful, randString)
        {
            if(err)
            {
                console.log(err);
                res.end();
            }
            else
            {
                if(successful)
                {
                    if(config.settings.cookieExpiration == 0)
                    {
                        res.cookie('loggedIn', randString);
                    }
                    else
                    {
                        res.cookie('loggedIn', randString, { maxAge: parseInt(config.settings.cookieExpiration) });
                    }
                    
                    res.end();
                }
                else
                {
                    res.end();
                }
            }
        });
    }
    else
    {
        res.end();
    }
});

app.get('/isLoggedIn', function(req, res)
{
    if(req.cookies.loggedIn)
    {
        login.checkCookie(req.cookies.loggedIn, function(correct)
        {
            if(correct)
            {
                res.json({ loggedIn: true });
            }
            else
            {
                res.json({ loggedIn: false });
            }
        });
    }
    else
    {
        res.json({ loggedIn: false });
    }
});

app.get('/getBlogInfo', function(req, res)
{
    login.getBlogInfo(function(err, bio, photo)
    {
        if(err)
        {
            console.log(err);
        }
        
        var blogInfo = { bio: bio, photo: photo };
        res.send(blogInfo);
    });
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
                    //Only ID and Title need to be sent in response
                    let postList = [];

                    for(let i = 0;i < posts.length;i++)
                    {
                        let post = {};
                        post._id = posts[i]._id;
                        post.title = posts[i].title;

                        postList.push(post);
                    }

                    postList = postList.reverse();
                    res.send(postList);
                }
            }
        });
    }
    else
    {
        res.end();
    }
});

app.get('/getAllPosts', function(req, res)
{
    blog.getAllPosts(database, function(err, posts)
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
                //Only ID and Title need to be sent in response
                let postList = [];

                for(let i = 0;i < posts.length;i++)
                {
                    let post = {};
                    post._id = posts[i]._id;
                    post.title = posts[i].title;

                    postList.push(post);
                }

                postList = postList.reverse();
                res.send(postList);
            }
        }
    });
});

app.get('/search', function(req, res)
{
    blog.searchPosts(database, req.query.query, function(err, results)
    {
        if(err)
        {
            console.log(err);
            res.end();
        }
        else
        {
            if(results)
            {
                res.send(results);
            }
            else
            {
                res.end();
            }
        }
    });
});

app.get('/loadPost', function(req, res)
{
    if(req.query.postId)
    {
        blog.loadPost(database, req.query.postId, function(err, result)
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
    }
});

app.get('/getComments', function(req, res)
{
    //Get comments related to postID passed in query
    blog.getComments(database, req.query.id, function(err, comments)
    {
        if(err)
        {
            console.log(err);
            res.end();
        }
        else
        {
            if(comments)
            {
                res.send(comments);
            }
        }
    });
});
/* END OF GETS */

/* POSTS */
app.post('/makeBlog', function(req, res)
{
    if(req.body.name && req.body.password)
    {
        login.makeBlog(req.body.name, req.body.password, function(err)
        {
            if(err)
            {
                console.log(err);
            }
            
            res.end();
        });
    }
    else
    {
        res.end();
    }
});

app.post('/updateBio', function(req, res)
{
    if(req.body.bio)
    {
        login.updateBio(req.body.bio, function(err)
        {
            if(err)
            {
                console.log(err);
            }
            
            res.end();
        });
    }
    else
    {
        res.end();
    }
});

app.post('/updatePhoto', function(req, res)
{
    if(req.body.photo)
    {
        login.updatePhoto(req.body.photo, function(err)
        {
            if(err)
            {
                console.log(err);
            }
            
            res.end();
        });
    }
    else
    {
        res.end();
    }
});

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
    else
    {
        res.end();
    }
});

app.post('/sendComment', function(req, res)
{
    blog.sendComment(database, req.body.id, req.body.comment, function(err)
    {
        if(err)
        {
            console.log(err);
        }

        res.end();
    });
});
/* END OF POSTS */
