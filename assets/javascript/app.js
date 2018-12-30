console.log("API Test") //TESTING HTML/JS LINK !!SUCCESS!!

// Setting up our variables for Ajax
var APIKey = "YcQglRE4TS4xD2BTKk106HhEgiRLbsym" //VivaMango's GIPHY API Key
var searchTerm //defining to use later in AJAX on-click
var queryURL //defining to use later in response



// Getting the input value from our giphyInput and preventing default action of giphySubmit button
$("#giphySubmit").on("click", function() {
    event.preventDefault()
    console.log("Button on-click Test") //WORKING
    var searchTerm = $("#giphyInput").val() //saving input field value as a variable
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKey //structuring our queryURL based on GIPHY documentation
    console.log (searchTerm , "searchTerm .val test") //WORKING
    // AJAX CALL TO GIPHY API
    $.ajax({
        url: queryURL, //using queryURL structured variable
        method: "GET" //GET method for getting GIFs back as response JSON
    }).then(function(response) {  //function utilizing the JSON response object from GIPHY
        console.log(response); //WORKING
        console.log(response.data , "response.data test") //WORKING
        console.log(response.data[0] , "response.data0 test") //WORKING
        var embed_urltest = response.data[1].images.original.url //saving access to JSON as variable WORKING!!!
        var newGIF = $("<img>") //Making a new HTML image container for our GIF
        newGIF.attr("src" , embed_urltest) //adding the SRC attribute link to our GIF
        newGIF.addClass("responseGIF") //addClass for styling
        console.log(response.data[1] , "responsedata1") //WORKING
        $("#giphyDisplay").append(newGIF) 
    });
});


