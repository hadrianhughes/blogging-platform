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
}

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

module.exports = blog;
