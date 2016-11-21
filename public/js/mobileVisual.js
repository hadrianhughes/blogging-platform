$(document).ready(function()
{
    $('#app').on('click', '#btnMobBlogInfo', function()
    {
        setTimeout(function()
        {
            $('#mobBlogInfo').animate({ top: 0 });
        }, 100);
    });
    
    $('#app').on('click', '#btnMobPostList', function()
    {
        setTimeout(function()
        {
            $('#mobPostList').animate({ bottom: 0 });
        }, 100);
    });
});
