$(document).ready(function()
{
    var monthListOpen = false;

    $('#archiveApp').on('click', '#btnDate', function()
    {
        $('#monthList').slideUp();
        $('#monthList').slideDown();
    });
});
