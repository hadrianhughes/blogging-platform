var ObjectId = require('mongodb').ObjectID;

var blog = {};

/* FUNCTIONS TO BE EXPORTED */
blog.getMonths = function(db, callback)
{
    try
    {
        db.collection('posts').find(function(err, cursor)
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
                            callback(retMonths);
                        });
                    }
                });
            }
            catch(ex)
            {
                console.log(ex);
                callback();
            }
        });
    }
    catch(ex)
    {
        console.log(ex);
        callback();
    }
};

blog.getPosts = function(db, month, callback)
{
    //Query database
    const monthString = month.month + '/' + month.year;
    
    try
    {
        db.collection('posts').find({ date: monthString }, function(err, cursor)
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
        //Find all posts published on the selected month
    //Put all into array
    //Callback
};

blog.searchPosts = function(db, query, callback)
{
    //Query database
        //Find all posts with tags matching the query
        //Find all posts which contain the query in their name
    //Add all to array
    //Callback
    callback();
};

blog.loadPost = function(db, callback)
{
    //Query database
    try
    {
        db.collection('posts').findOne({ 'title' : 'Test' }, function(err, doc)
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
        callback(ex, null);
    }
};

blog.sendComment = function(db, id, comment, callback)
{
    //Find post in database with selected ID
    console.log(comment);
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
};

blog.makePost = function(db, post, callback)
{
    const date = new Date();
    const dateString = (date.getMonth() + 1) + '/' + date.getFullYear();
    
    try
    {
        db.collection('posts').save({ date: dateString, comments: [], title: post.title, content: post.content, banner: post.banner, tags: post.tags, allowComments: post.allowComments, allowProfanity: post.allowProfanity, limit: post.limit }, function(err)
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
/* END OF INTERNAL FUNCTIONS */

module.exports = blog;
