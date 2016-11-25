var fs = require('fs');
var fileName = './cfg/blog.json';
var config = require('../cfg/config.json');

var login = {};

/* FUNCTIONS TO BE EXPORTED */
login.getBlogInfo = function(callback)
{
    try
    {
        var blogInfo = JSON.parse(fs.readFileSync(fileName).toString());
        callback(null, blogInfo.bio, blogInfo.photo);
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
    
    //Make JSON object full of login info and default blog info
    /*var blogInfo = {
        "name" : name,
        "email" : email,
        "password" : password,
        "bio" : "This is your bio. Click here to change it!",
        "photo" : "http://placehold.it/300x300"
    };
    
    try
    {
        //Get data currently stored in blog.json
        var jsonData = JSON.parse(fs.readFileSync(fileName).toString());
        
        //Change all the data to the details in blogInfo object
        jsonData.name = blogInfo.name;
        jsonData.password = blogInfo.password;
        jsonData.bio = blogInfo.bio;
        jsonData.photo = blogInfo.photo;
        
        //Overwrite file with new details
        fs.writeFile(fileName, JSON.stringify(jsonData));
        callback();
    }
    catch(ex)
    {
        callback(ex);
    }*/
};

login.updateBio = function(bio, callback)
{
    try
    {
        var jsonData = JSON.parse(fs.readFileSync(fileName).toString());
        jsonData.bio = bio;
        fs.writeFile(fileName, JSON.stringify(jsonData));
        callback();
    }
    catch(ex)
    {
        callback(ex);
    }
};

login.updatePhoto = function(url, callback)
{
    try
    {
        var jsonData = JSON.parse(fs.readFileSync(fileName).toString());
        jsonData.photo = url;
        fs.writeFile(fileName, JSON.stringify(jsonData));
        callback();
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
    
    /*
    let correctName = false;
    let correctPass = false;
    
    try
    {
        var jsonData = JSON.parse(fs.readFileSync(fileName).toString());
        if(jsonData.name == name)
        {
            correctName = true;
        }
        if(jsonData.password == password)
        {
            correctPass = true;
        }
        
        if(correctName && correctPass)
        {
            makeRandomString(function(string)
            {
                updateBlogString(string);
                callback(null, true, string);
            });
        }
        else
        {
            callback(null, false);
        }
    }
    catch(ex)
    {
        callback(ex);
    }
    */
};

login.checkCookieValue = function(db, email, value, callback)
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
                if(doc.randString === value)
                {
                    callback(null, true);
                }
                else
                {
                    callback(null, false);
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
    
    /*
    var PREFIX = config.settings.authenticationPrefix;
    
    try
    {
        var jsonData = JSON.parse(fs.readFileSync(fileName).toString());
        var STRING = jsonData.randomString;
        
        var cookiePrefix = value.substring(0, 3);
        var cookieValue = value.substring(3);
        
        if(cookiePrefix == PREFIX && cookieValue == STRING.substring(3))
        {
            callback(null, true)
        }
        else
        {
            callback(null, false);
        }
    }
    catch(ex)
    {
        callback(ex);
    }
    */
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
