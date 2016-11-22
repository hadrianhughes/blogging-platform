$(document).ready(function()
{
    $('#app').on('click', '#btnDate', function()
    {
        console.log('.');
        $('#monthList').slideUp();
        $('#monthList').slideDown();
    });
    
    $('#app').on('click', '#btnSearch', function()
    {
        console.log('.');
        $('#resultsList').slideUp();
        $('#resultsList').slideDown();
    });
});
