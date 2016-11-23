$(document).ready(function()
{
    $('#app').on('click', '#btnDate', function()
    {
        $('#monthList').slideUp();
        $('#monthList').slideDown();
    });
    
    $('#app').on('click', '#btnSearch', function()
    {
        $('#resultsList').slideUp();
        $('#resultsList').slideDown();
    });
    
    var footerVisible = true;
    $('#app').bind('mousewheel', function()
    {
        if($('#fullPost').length)
        {
            if($('#fullPost').scrollTop() + $('#fullPost').height() == $('#fullPost')[0].scrollHeight)
            {
                //Footer will only animate once
                if(footerVisible)
                {
                    $('.footer').animate({ bottom: -100 });
                    footerVisible = false;
                }
            }
            else
            {
                if(!footerVisible)
                {
                    $('.footer').animate({ bottom: 0 });
                    footerVisible = true;
                }
            }
        }
    });
});
