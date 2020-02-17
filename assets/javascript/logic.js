$(document).ready(function () {
    populateButtons(Topics, 'searchButton', '#buttonsArea')

});

var Topics = ["manatee", "dolphin", "stingray", "fish", "shark"];

function populateButtons(Topics, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < Topics.length; i++) {
        var a = $('<button class="btn btn-danger" style="margin:1%; background-color:rgb(221, 94, 116); border:none">');
        a.addClass(classToAdd);
        a.attr('data-type', Topics[i]);
        a.text(Topics[i]);
        $(areaToAddTo).append(a);
    }
};

$(document).on('click', '.searchButton', function () {
    $('#searches').empty();
  
    var type = $(this).attr('data-type');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        type + "&api_key=7T2AwhXBS4Npw8okLWSh9y0Y9aFXOpUs&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {

            $('#search-input').empty();
            var Div1 = $('<div class= "card" id= "search-item">');
            var rating = response.data[i].rating;
            var p = $('<p>').text('Rating: ' + rating).css({
                "visibility": "visible",
                "display": "block"
            });

            //variable for gif while moving
            var animated = response.data[i].images.fixed_height.url;

            // variable for gif while still
            var still = response.data[i].images.fixed_height_still.url;

            //assiging attributes to image to make into gif
            var image = $('<img>');
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            image.attr('data-state', still);
            image.addClass('searchImage');

            
            Div1.append(p);

            Div1.prepend(image);
            $('#searches').append(Div1);
        }


    })


})

//function for animating gif when user clicks
$(document).on('click', '.searchImage', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

//adding new buttons to search Topics
$('.btn').on('click', function (event) {

    event.preventDefault();
    var newSearch = $('input').eq(0).val().toLowerCase();
    Topics.push(newSearch);
    populateButtons(Topics, 'searchButton', '#buttonsArea');

});