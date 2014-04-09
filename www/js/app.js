window.beerduino = {};



beerduino.displayCode = function(theCode, blinkLength,  time)
{
    if(theCode.length == 7)
        theCode = "0" + theCode;

    console.log("Printing: " + theCode);
    for(f = 0; f < theCode.length; f++)
    {
        if(theCode[f] == "1")
        {
            setTimeout(beerduino.blinkOn, time);
            time += blinkLength;
            setTimeout(beerduino.blinkOff, time);
            time += blinkLength;
        }
        else
        {
            setTimeout(beerduino.blinkOff, time);
            time += blinkLength;
            setTimeout(beerduino.blinkOff, time);
            time += blinkLength;
        }

    }

    return time;
}


beerduino.blinkRed = function () {
    $('body').css('background-color', 'red');
};

beerduino.blinkOn = function () {
    $('body').css('background-color', 'white');
};

beerduino.blinkOff = function () {
    $('body').css('background-color', 'black');
};

beerduino.toggleGUI = function() {
    $('.row').toggle();
}


$(function () {
    $('#programBeerduino').on('click', function (event) {
        $('.row').hide();
        event.preventDefault();
        var time = 0;
        var blinkLength = parseInt($('#bitTime').val());

        time = beerduino.displayCode("0000010", blinkLength, time);

        for (i = 0; i < $('#beerName').val().length; i++) {
            toBlink = $('#beerName').val().charCodeAt(i);
            toBlinkBinary = toBlink.toString(2);

            time = beerduino.displayCode(toBlinkBinary, blinkLength, time);

        }

        setTimeout(beerduino.blinkOn, time);
        setTimeout(beerduino.toggleGUI, time);
    });
});
