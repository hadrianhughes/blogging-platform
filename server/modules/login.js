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
    //Make JSON object full of login info and default blog info
    var blogInfo = {
        "name" : name,
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

module.exports = login;
