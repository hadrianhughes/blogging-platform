if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
    $.getScript('/getMobile');
}
else
{
    $.getScript('/getDesktop');
}
