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
/* FOR DEV */
app.get('/removeCookie', function(req, res)
{
    res.clearCookie('sy_loggedIn');
    res.clearCookie('sy_blog');
    res.end();
});

app.get('/checkCookies', function(req, res)
{
    console.log(req.cookies);
});
/* END OF DEV */

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

app.get('/hasBlogCookie', function(req, res)
{
    if(req.cookies.sy_blog)
    {
        res.json({ hasCookie : true });
    }
    else
    {
        res.json({ hasCookie : false });
    }
});

app.get('/getBlogCookie', function(req, res)
{
    if(req.query.blog)
    {
        res.cookie('sy_blog', req.query.blog);
        res.end();
    }
    else
    {
        res.end();
    }
});

app.get('/getBlogs', function(req, res)
{
    login.getBlogs(database, function(err, blogs)
    {
        if(err)
        {
            console.log(err);
            res.end();
        }
        else
        {
            if(blogs)
            {
                res.send(blogs);
            }
            else
            {
                res.end();
            }
        }
    });
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
                        res.cookie('sy_loggedIn', randString);
                    }
                    else
                    {
                        res.cookie('sy_loggedIn', randString, { maxAge: parseInt(config.settings.cookieExpiration)});
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
    if(req.cookies.sy_loggedIn && req.cookies.sy_blog)
    {
        //Get email and random string from cookie
        var parts = req.cookies.sy_loggedIn.split(':');
        
        login.checkCookieValue(database, req.cookies.sy_blog, parts[0], parts[1], function(err, correct)
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
    if(req.cookies.sy_blog)
    {
        login.getBlogInfo(database, req.cookies.sy_blog, function(err, bio, photo)
        {
            if(err)
            {
                console.log(err);
                res.end();
            }
            else
            {
                var blogInfo = { bio: bio, photo: photo };
                res.send(blogInfo);
            }
        });
    }
});

app.get('/getMonths', function(req, res)
{
    if(req.cookies.sy_blog)
    {
        //Get list of months for posts
        blog.getMonths(database, req.cookies.sy_blog, function(err, months)
        {
            if(err)
            {
                console.log(err);
                res.end();
            }
            else
            {
                if(months)
                {
                    res.send(months);
                }
                else
                {
                    res.end();
                }
            }
        });
    }
});

app.get('/getPostList', function(req, res)
{
    if(req.cookies.sy_blog)
    {
        if(req.query.month)
        {
            blog.getPosts(database, req.cookies.sy_blog, req.query.month, function(err, posts)
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
    if(req.cookies.sy_blog)
    {
        blog.searchPosts(database, req.cookies.sy_blog, req.query.query, function(err, results)
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
    }
    else
    {
        res.end();
    }
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

app.get('/getLoginCookie', function(req, res)
{
    if(req.query.value && req.query.email && req.cookies.sy_blog)
    {
        login.checkCookieValue(database, req.cookies.sy_blog, req.query.email, req.query.value, function(err, correct)
        {
            if(err)
            {
                console.log(err);
                res.end();
            }
            else
            {
                if(correct)
                {
                    res.cookie('sy_loggedIn', req.query.email + ':' + req.query.value);
                    res.end();
                }
                else
                {
                    res.end();
                }
            }
        });
    }
});

app.get('*', function(req, res)
{
    res.sendFile('index.html', { root: '../public' });
});
/* END OF GETS */

/* POSTS */
app.post('/login', function(req, res)
{
    if(req.body.email && req.body.password)
    {
        login.login(database, req.body.email, req.body.password, function(err, successful, randString)
        {
            if(err)
            {
                res.end();
            }
            else
            {
                if(successful)
                {
                    res.send(randString);
                }
                else
                {
                    res.end();
                }
            }
        });
    }
});

app.post('/makeBlog', function(req, res)
{
    if(req.body.name && req.body.password)
    {
        login.makeBlog(database, req.body.name, req.body.email, req.body.password, function(err)
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
    if(req.cookies.sy_loggedIn)
    {
        if(req.body.bio)
        {
            var parts = req.cookies.sy_loggedIn.split(':');
            
            login.updateBio(database, parts[0], req.body.bio, function(err)
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
    }
    else
    {
        res.end();
    }
});

app.post('/updatePhoto', function(req, res)
{
    if(req.cookies.sy_loggedIn)
    {
        if(req.body.photo)
        {
            var parts = req.cookies.sy_loggedIn.split(':');
            
            login.updatePhoto(database, parts[0], req.body.photo, function(err)
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
    }
    else
    {
        res.end();
    }
});

app.post('/post', function(req, res)
{
    if(req.cookies.sy_loggedIn)
    {
        if(req.body.post)
        {
            var parts = req.cookies.sy_loggedIn.split(':');
            
            blog.makePost(database, parts[0], req.body.post, function(err)
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
