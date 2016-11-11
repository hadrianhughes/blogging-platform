$(document).ready(function()
{

    $('#archiveApp').on('click', '#btnDate', function()
    {
        $('#monthList').slideUp();
        $('#monthList').slideDown();
    });
    
    $('#archiveApp').on('click', '#btnSearch', function()
    {
        $('#resultsList').slideUp();
        $('#resultsList').slideDown();
    });
});
