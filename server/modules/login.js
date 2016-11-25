var ObjectId = require('mongodb').ObjectID;
var fs = require('fs');
var fileName = './cfg/blog.json';
var config = require('../cfg/config.json');

var login = {};

/* FUNCTIONS TO BE EXPORTED */
login.getBlogs = function(db, callback)
{
    try
    {
        db.collection('users').find({}, function(err, cursor)
        {
            if(err)
            {
                throw err;
            }
            
            try
            {
                let blogs = [];
                cursor.each(function(err, doc)
                {
                    if(err)
                    {
                        throw err;
                    }
                    
                    if(doc)
                    {
                        let blog = { _id: doc._id, name: doc.name };
                        blogs.push(blog);
                    }
                    else
                    {
                        callback(null, blogs);
                    }
                });
            }
            catch(ex)
            {
                callback(ex);
            }
        });
    }
    catch(ex)
    {
        callback(ex);
    }
}

login.getBlogInfo = function(db, id, callback)
{
    try
    {
        db.collection('users').findOne({ "_id" : ObjectId(id) }, function(err, doc)
        {
            if(err)
            {
                throw err;
            }
            
            if(doc)
            {
                callback(null, doc.bio, doc.photo);
            }
            else
            {
                callback();
            }
        });
    }
    catch(ex)
    {
        callback(ex);
    }
};

login.makeBlog = function(db, name, email, password, callback)
{
    try
    {
        db.collection('users').findOne({ "email" : email }, function(err, doc)
        {
            if(err)
            {
                throw err;
            }
            
            if(doc)
            {
                callback();
            }
            else
            {
                try
                {
                    db.collection('users').save({ "name" : name, "email" : email, "password" : password, "bio" : "This is your bio. Click here to change it!", "photo" : "http://placehold.it/300x300" }, function(err)
                    {
                        if(err)
                        {
                            throw err;
                        }
                        
                        callback();
                    });
                }
                catch(ex)
                {
                    callback(ex);
                }
            }
        });
    }
    catch(ex)
    {
        callback(ex);
    }
};

login.updateBio = function(db, email, bio, callback)
{
    try
    {
        db.collection('users').update({ "email" : email }, { $set: { "bio" : bio }}, function(err)
        {
            if(err)
            {
                throw err;
            }
            else
            {
                callback();
            }
        });
    }
    catch(ex)
    {
        callback(ex);
    }
};

login.updatePhoto = function(db, email, url, callback)
{
    try
    {
        db.collection('users').update({ "email" : email }, { $set: { "photo" : url }}, function(err)
        {
            if(err)
            {
                throw err;
            }
            else
            {
                callback();
            }
        });
    }
    catch(ex)
    {
        callback(ex);
    }
};

login.login = function(db, email, password, callback)
{
    try
    {
        db.collection('users').findOne({ "email" : email }, function(err, doc)
        {
            if(err)
            {
                throw err;
            }
            
            if(doc)
            {
                if(doc.password === password)
                {
                    makeRandomString(function(string)
                    {
                        try
                        {
                            db.collection('users').update({ "email" : email }, { $set: { "randString" : string }}, function(err)
                            {
                                
                                if(err)
                                {
                                    throw err;
                                }
                                
                                callback(null, true, string);
                                
                            });
                        }
                        catch(ex)
                        {
                            callback(ex);
                        }
                    });
                }
                else
                {
                    callback(null, false);
                }
            }
            else
            {
                callback(null, false);
            }
        });
    }
    catch(ex)
    {
        callback(ex);
    }
};

login.checkCookieValue = function(db, blog, email, value, callback)
{
    try
    {
        db.collection('users').findOne({ "email" : email }, function(err, doc)
        {
            if(err)
            {
                throw err;
            }
            
            if(doc)
            {
                if(doc._id == blog)
                {
                    if(doc.randString === value)
                    {
                        callback(null, true);
                    }
                    else
                    {
                        callback(null, false);
                    }
                }
            }
            else
            {
                callback();
            }
        });
    }
    catch(ex)
    {
        callback(ex);
    }
};
/* END OF FUNCTIONS TO BE EXPORTED */

//Used for authenticating cookies
function makeRandomString(callback)
{
    var POSSIBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    
    var retString = '';
    
    for(var i = 0;i < 10;i++)
    {
        var rand = Math.floor(Math.random() * POSSIBLE_CHARS.length);
        retString += POSSIBLE_CHARS[rand];
    }
    
    callback(retString);
}

function updateBlogString(string)
{
    try
    {
        var jsonData = JSON.parse(fs.readFileSync(fileName).toString());
        jsonData.randomString = string;
        fs.writeFile(fileName, JSON.stringify(jsonData));
    }
    catch(ex)
    {
        console.log(ex);
    }
}

module.exports = login;
