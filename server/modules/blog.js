var blog = {};

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
                        var month = dateParts[1];
                        var year = dateParts[2];
                        
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
                        callback(months);
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
}

module.exports = blog;
