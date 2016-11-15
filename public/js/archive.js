$(document).ready(function()
{

    $('#archive').on('click', '#btnDate', function()
    {
        $('#monthList').slideUp();
        $('#monthList').slideDown();
    });
    
    $('#archive').on('click', '#btnSearch', function()
    {
        $('#resultsList').slideUp();
        $('#resultsList').slideDown();
    });
});
