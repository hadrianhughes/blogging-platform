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
});
