$(document).ready(function()
{
    $('#app').on('click', '#btnMobBlogInfo', function()
    {
        setTimeout(function()
        {
            console.log('.');
            $('#mobBlogInfo').animate({ top: 0 });
        }, 100);
    });
});
