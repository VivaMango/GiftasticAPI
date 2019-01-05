console.log("API Test") //TESTING HTML/JS LINK !!SUCCESS!!

// Setting up our variables
var topics = ["apple" , "banana" , "orange" , "mango" , "pineapple" , "coconut" , "pear"]
//FOR AJAX
var APIKey = "YcQglRE4TS4xD2BTKk106HhEgiRLbsym" //VivaMango's GIPHY API Key
var searchTerm //defining to use later in AJAX on-click
var queryURL //defining to use later in response

// Working with our array of topics to create buttons forEach topics when the page is loaded

function buttonGenerator() {
    topics.forEach(function(element) {
        console.log(element, "foreach fruit") //WORKING
        var buttonGIF = $("<button>") //jQuery new button as variable
        buttonGIF.data("buttontext" , element) //id equal to value in topics
        buttonGIF.addClass("gifFetchButton") //class for click listener
        // add bootstrap button styling here
        buttonGIF.text(element) //adding text to button equal to value in topics
        $("#buttonDisplay").append(buttonGIF) //appending buttons to the DOM
    });
};
buttonGenerator(); //RUNS buttonGenerator (DEF Ln12) to create our initial row of buttons from topics array when the page is loaded


// CLICK LISTENER FOR GIFFETCHBUTTON 
$(".gifFetchButton").on("click", function () { //WHEN GIFFETCH BUTTON IS CLICKED EVENTLISTENER
    console.log(event.target , "event.target gifFetchButton") //WORKING
    console.log(event.currentTarget , "event.currentTarget gifFetchButton") //WORKING
    var eventTarget = event.currentTarget //WORKING - DOES NOT WORK WITH $()!!!
    console.log(eventTarget , "eventTarget var")  //specific element gifFetchButton that triggered the click event
    var targetClass = $(event.currentTarget).attr("class") //WORKING - NEEDS $() TO WORK!!!
    var targetVal = $(event.currentTarget).val() // value of the text on the gifFetchButton that triggered the click event
    console.log(targetVal , "targetVal var") //WORKING
    console.log(targetClass , "targetClass var") //class attr of the gifFetchButton that triggered click event
    var searchTerm = $(this).data("buttontext") //USING THE DATA ATTRIBUTE BUTTONTEXT TO DECLARE searchTerm
    console.log(searchTerm , "buttonclick searchTerm test") //WORKING
    var APIKey = "YcQglRE4TS4xD2BTKk106HhEgiRLbsym" //VivaMango Giphy API Key
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKey //structuring our queryURL based on GIPHY documentation
    $.ajax({ //OPENING ASYNCHRONOUS JSON AND XML CALL
        url: queryURL, //using queryURL structured variable
        method: "GET" //GET method for getting GIFs back as response JSON
    }).then(function(response) {  //function utilizing the JSON response object from GIPHY
        // for loop generating 10 gifs from the response JSON
        for (i = 0; i < 10; i++) { //FOR LOOP GENERATING GIFS FROM RESPONSE JSON
            animatedURL = response.data[i].images.original.url //saving access to JSON as variable 
            stillURL = response.data[i].images.original_still.url //saving access to JSON as variable WORKING!!! SWAPPED TO STILL
            console.log(i , "itest") //WORKING
            console.log(animatedURL , "animatedURL outside gifCreator") //WORKING
            gifCreator() //RUNS gifCreator function (DEF Ln97) - Dynamically creates <img> tag with attr's and appends to #giphyDisplay
        }

        // Click event listener for .gif class made by gifCreator
        $(".gif").on("click" , function () {
            var targetEvent = event.currentTarget //element that triggered our click event
            console.log(targetEvent , "targetEvent") //WORKING
            var stillEvent = $(event.currentTarget).attr("still-link") //handling stillURL from click event .attr
            console.log(stillEvent , "stillEvent") //WORKING
            var animatedEvent = $(event.currentTarget).attr("animated-link") //handling animatedURL from click event .attr
            console.log(animatedEvent , "animatedEvent") //WORKING
            var stateEvent = $(event.currentTarget).attr("link-state") //handling click event .attr link-state 
            console.log(stateEvent , "stateEvent") //WORKING
            gifSwapper(targetEvent , stillEvent , animatedEvent , stateEvent) //RUNS gifSwapper function (DEF Ln71) - Checks value of link-state from click event and swaps the active URL with the inactive URL, then adjusts link-state for subsequent clicks
        })        
    });
})



//RUN THIS .on("click") using event.target attrs as params
function gifSwapper(event , stilink , anilink , state) { //function to swap between animated and still URLs. Takes three arguments, still-link attr and animated-link attr and link-state attr
    
    var stateEventCheck = state //making VSCode happy
    console.log(stateEventCheck , "stateEventCheck inside gifSwapper outside if") //WORKING
    console.log(state , "state outside if") //WORKING
    if (stateEventCheck === "still") { 
        console.log(state , "state inside if") //WORKING
        console.log(stateEventCheck , "stateEventCheck inside gifSwapper inside if") //WORKING
        console.log("img was still") //WORKING
        $(event).attr("src" , anilink) //SWAPPING IMAGE LINK TO animatedURL LINK
        $(event).attr("link-state" , "animated") //UPDATING link-state DATA ATTRIBUTE TO ANIMATED (FOR SUBSEQUENT CLICKS)
        console.log($(event).attr("link-state") , "link-state inside if") //WORKING
        console.log("img is now animated") //WORKING
    } else {
        console.log(stateEventCheck , "stateEventCheck inside gifSwapper inside else") //WORKING
        console.log("img was animated") //WORKING
        $(event).attr("src" , stilink) //SWAPPING IMAGE LINK TO stillURL LINK 
        $(event).attr("link-state" , "still") // UPDATING link-state DATA ATTRIBUTE TO STILL (FOR SUBSEQUENT CLICKS)
        console.log("img is now still") //WORKING
    }
} 




// DECLARING OUR gifCreator function: ACCESSES JSON RESPONSE AND DYNAMICALLY ADDS <img> with attr's TO #giphyDisplay on index.html
function gifCreator () {
    var newGIF = $("<img>") //Making a new HTML image container for our GIF
    newGIF.attr("src" , stillURL) //adding stillURL as the img src to load still gif first
    newGIF.attr("animated-link" , animatedURL) //adding animatedURL as an attribute to call later
    newGIF.attr("still-link" , stillURL) //adding stillURL as an attribute to call later
    newGIF.attr("link-state" , "still") //adding a link-state attribute to hold status of gif still/animated
    newGIF.addClass("gif") //addClass for styling
    console.log(animatedURL , "animatedURL inside gifCreator") //WORKING
    $("#giphyDisplay").append(newGIF) //appending our new GIFs to the HTML container #giphyDisplay
    console.log(animatedURL , "animatedURL inside AFTER APPEND") //WORKING
}



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
        var embed_urltest = response.data[1].images.original_still.url //saving access to JSON as variable WORKING!!! SWAPPED TO STILL
        var newGIF = $("<img>") //Making a new HTML image container for our GIF
        newGIF.attr("src" , embed_urltest) //adding the SRC attribute link to our GIF
        newGIF.addClass("responseGIF") //addClass for styling
        console.log(response.data[1] , "responsedata1") //WORKING
        $("#giphyDisplay").append(newGIF)  //appending the newGIF to our giphyDisplay on index.html
    });
});


