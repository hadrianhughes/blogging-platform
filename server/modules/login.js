var fs = require('fs');
var fileName = './cfg/blog.json';

var login = {};

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

login.makeBlog = function(name, password, callback)
{
    var blogInfo = {
        "name" : name,
        "password" : password,
        "bio" : "This is your bio. Click here to change it!",
        "photo" : "http://placehold.it/300x300"
    };
    
    try
    {
        var jsonData = JSON.parse(fs.readFileSync(fileName).toString());
        jsonData.name = blogInfo.name;
        jsonData.password = blogInfo.password;
        jsonData.bio = blogInfo.bio;
        jsonData.photo = blogInfo.photo;
        fs.writeFile(fileName, JSON.stringify(jsonData));
        callback();
    }
    catch(ex)
    {
        callback(ex);
    }
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

module.exports = login;
