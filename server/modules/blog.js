var ObjectId = require('mongodb').ObjectID;

var blog = {};

/* FUNCTIONS TO BE EXPORTED */
blog.getMonths = function(db, id, callback)
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
                try
                {
                    db.collection('posts').find({ "user" : doc.email }, function(err, cursor)
                    {
                        if(err)
                        {
                            throw err;
                        }
            
                        try
                        {
                            //Declare array of months
                            var months = [];
                            cursor.each(function(err, doc)
                            {
                                if(err)
                                {
                                    throw err;
                                }
            
                                if(doc)
                                {
                                    //Get month and year from date of post
                                    var dateParts = doc.date.split('/');
                                    var month = dateParts[0];
                                    var year = dateParts[1];
            
                                    //If not already present in the array...
                                    var exists = false;
                                    for(var i = 0;i < months.length;i++)
                                    {
                                        if(months[i].month == month && months[i].year == year)
                                        {
                                            exists = true;
                                            break;
                                        }
                                    }
            
                                    if(!exists)
                                    {
                                        months.push({ month: month, year: year });
                                    }
                                }
                                else
                                {
                                    sortMonths(months, function(retMonths)
                                    {
                                        callback(null, retMonths);
                                    });
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
        });
    }
    catch(ex)
    {
        callback(ex);
    }
};

blog.getPosts = function(db, id, month, callback)
{
    //Query database
    const monthString = month.month + '/' + month.year;

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
                try
                {
                    db.collection('posts').find({ "user" : doc.email, "date" : monthString }, function(err, cursor)
                    {
                        if(err)
                        {
                            throw err;
                        }
            
                        try
                        {
                            let posts = [];
                            cursor.each(function(err, doc)
                            {
                                if(err)
                                {
                                    throw err;
                                }
            
                                if(doc)
                                {
                                    posts.push(doc);
                                }
                                else
                                {
                                    callback(null, posts);
                                }
                            });
                        }
                        catch(ex)
                        {
                            callback(ex, null);
                        }
                    });
                }
                catch(ex)
                {
                    callback(ex, null);
                }
            }
        });
    }
    catch(ex)
    {
        callback(ex);
    }
};

blog.getAllPosts = function(db, callback)
{
    db.collection('posts').find({}, function(err, cursor)
    {
        if(err)
        {
            throw err;
        }

        try
        {
            let posts = [];
            cursor.each(function(err, doc)
            {
                if(err)
                {
                    throw err;
                }

                if(doc)
                {
                    posts.push(doc);
                }
                else
                {
                    callback(null, posts);
                }
            });
        }
        catch(ex)
        {
            callback(ex, null);
        }
    });
};

blog.searchPosts = function(db, userId, term, callback)
{
    var QUERY = new RegExp(".*" + term + ".*", 'i');
    
    
    //Query database
    try
    {
        db.collection('users').findOne({ "_id" : ObjectId(userId) }, function(err, doc)
        {
            if(err)
            {
                throw err;
            }
            
            if(doc)
            {
                try
                {
                    db.collection('posts').find({
                        "$and" : [{
                            "user" : doc.email
                        },{
                            "$or" : [{
                                "title" : { $regex: QUERY }
                            },{
                                "tags.value" : term.toLowerCase()
                            }]
                        }]
                    }, function(err, cursor)
                    {
                        if(err)
                        {
                            throw err;
                        }
                        
                        let posts = [];
                        
                        try
                        {
                            cursor.each(function(err, doc)
                            {
                                if(err)
                                {
                                    throw err;
                                }
                                
                                if(doc)
                                {
                                    posts.push(doc);
                                }
                                else
                                {
                                    callback(null, posts);
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
        });
    }
    catch(ex)
    {
        callback(ex);
    }
        //Find all posts with tags matching the query
        //Find all posts which contain the query in their name
    //Add all to array
    //Callback
};

blog.loadPost = function(db, postId, callback)
{
    //Query database
    try
    {
        db.collection('posts').findOne({ '_id' : ObjectId(postId) }, function(err, doc)
        {
            if(err)
            {
                throw err;
            }
            
            if(doc)
            {
                callback(null, doc);
            }
        });
    }
    catch(ex)
    {
        callback(ex);
    }
};

blog.getComments = function(db, id, callback)
{
    try
    {
        db.collection('posts').findOne({ _id: ObjectId(id) }, function(err, doc)
        {
            if(err)
            {
                throw err;
            }
            
            if(doc)
            {
                callback(null, doc.comments);
            }
        });
    }
    catch(ex)
    {
        callback(ex, null);
    }
};

blog.sendComment = function(db, id, comment, callback)
{
    filterSpam(comment, function(containsSpam)
    {
        if(containsSpam)
        {
            callback();
        }
        else
        {
            try
            {
                //Find related post in DB
                db.collection('posts').findOne({ _id: ObjectId(id) }, function(err, doc)
                {
                    if(err)
                    {
                        throw err;
                    }
                    
                    //If the post is found
                    if(doc)
                    {
                        //If profanity is allowed
                        if(doc.allowProfanity == 'true')
                        {
                            try
                            {
                                //Add the comment to the post
                                db.collection('posts').updateOne({ _id: ObjectId(id) }, { $push: { comments: { value: comment }}}, function(err)
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
                        else
                        {
                            //Otherwise, look for profanity
                            filterProfanity(db, comment, function(containsProfanity)
                            {
                                if(containsProfanity)
                                {
                                    //Reject the comment if it contains profanity
                                    callback();
                                }
                                else
                                {
                                    try
                                    {
                                        db.collection('posts').updateOne({ _id: ObjectId(id) }, { $push: { comments: { value: comment }}}, function(err)
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
        }
    });
};

blog.makePost = function(db, email, post, callback)
{
    const date = new Date();
    const dateString = (date.getMonth() + 1) + '/' + date.getFullYear();

    try
    {
        db.collection('posts').save({ "user" : email, "date" : dateString, "comments" : [], "title" : post.title, "content" : post.content, "banner": post.banner, "tags" : post.tags, "allowComments" : post.allowComments, "allowProfanity" : post.allowProfanity, "limit" : post.limit, "length" : post.length }, function(err)
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
};
/* END OF FUNCTIONS TO BE EXPORTED */

/* FUNCTIONS USED INTERNALLY */
function sortMonths(months, callback)
{
    var monthList = months;

    //Sort by year first (bubble sort)
    for(var i = 0;i < monthList.length;i++)
    {
        for(var j = 0;j < monthList.length - 1;j++)
        {
            if(monthList[j].year < monthList[j + 1].year)
            {
                var monthTemp = monthList[j + 1];
                monthList[j + 1] = monthList[j];
                monthList[j] = monthTemp;
            }
        }
    }

    //Split monthList array into separate arrays
    var yearContainer = []; //Will be 2D array
    var currentIndex = 0;
    yearContainer[currentIndex] = []; //Initialize first index of yearContainer as array
    for(var i = 0;i < monthList.length;i++)
    {
        yearContainer[currentIndex].push(monthList[i]);

        //If there is an array element in monthList after the current one
        if(monthList[i + 1])
        {
            //If the year value of this array element is not the same as the next...
            if(monthList[i].year != monthList[i + 1].year)
            {
                //Increment currentIndex and initialize the next array
                currentIndex++;
                yearContainer[currentIndex] = [];
            }
        }
    }

    //Sort each array in yearContainer by month
    for(var i = 0;i < yearContainer.length;i++)
    {
        for(var j = 0;j < yearContainer[i].length - 1;j++)
        {
            for(var k = 0;k < yearContainer[i].length - 1;k++)
            {
                if(yearContainer[i][k].month < yearContainer[i][k + 1].month)
                {
                    var monthTemp = yearContainer[i][k + 1];
                    yearContainer[i][k + 1] = yearContainer[i][k];
                    yearContainer[i][k] = monthTemp;
                }
            }
        }
    }

    //Merge arrays back together
    var retArray = yearContainer[0];
    for(var i = 1;i < yearContainer.length;i++)
    {
        retArray = retArray.concat(yearContainer[i]);
    }

    callback(retArray);
}

function filterProfanity(db, text, callback)
{
    var containsProfanity = false;
    try
    {
        //Get list of all banned words
        db.collection('banned-words').find({}, function(err, cursor)
        {
            if(err)
            {
                throw err;
            }
            
            try
            {
                //For each word
                cursor.each(function(err, doc)
                {
                    if(err)
                    {
                        throw err;
                    }
                    
                    if(doc)
                    {
                        //If the comment contains it as a whole word
                        var regex = new RegExp('\\b' + doc.value + '\\b');
                        if(text.toLowerCase().search(regex) > -1)
                        {
                            containsProfanity = true;
                        }
                    }
                    else
                    {
                        callback(containsProfanity);
                    }
                });
            }
            catch(ex)
            {
                console.log(ex);
            }
        });
    }
    catch(ex)
    {
        console.log(ex);
    }
}

function filterSpam(text, callback)
{
    var containsSpam = false;
    
    //All caps and links are not allowed
    if(text === text.toUpperCase()) containsSpam = true;
    if(text.indexOf('http://') > -1) containsSpam = true;
    
    var previousChar = '', charCount = 0;
    for(var i = 0;i < text.length;i++)
    {
        //If the current character is the same as the previous
        //Keep a record of how many times the same character has recurred
        if(text[i] == previousChar)
        {
            charCount++;
        }
        else
        {
            charCount = 0;
        }
        
        //If the same character recurs 4 times, block the comment
        if(charCount > 3)
        {
            containsSpam = true;
        }
        
        previousChar = text[i];
    }
    
    callback(containsSpam);
}
/* END OF INTERNAL FUNCTIONS */

module.exports = blog;
