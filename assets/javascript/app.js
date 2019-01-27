console.log("API Test") //TESTING HTML/JS LINK !!SUCCESS!!

// Setting up our variables
var topics = ["apple" , "banana" , "orange" , "mango" , "pineapple" , "coconut" , "pear"]
//FOR AJAX
var APIKey = "YcQglRE4TS4xD2BTKk106HhEgiRLbsym" //VivaMango's GIPHY API Key
var searchTerm //defining to use later in AJAX on-click 
var queryURL //defining to use later in response

// Function working with our array of topics to create buttons forEach topics when the page is loaded

function buttonGenerator() {
    topics.forEach(function(element) {
        console.log(element, "foreach fruit") //WORKING
        var buttonGIF = $("<button>") //jQuery new button as variable
        buttonGIF.data("buttontext" , element) //id equal to value in topics
        buttonGIF.addClass("gifFetchButton") //class for click listener
        // buttonGIF.addClass("btn btn-primary") //bootstrap button styling looks worse than default
        buttonGIF.text(element) //adding text to button equal to value in topics
        $("#buttonDisplay").append(buttonGIF) //appending buttons to the DOM
    });
};
buttonGenerator(); //RUNS buttonGenerator (DEF Ln12) to create our initial row of buttons from topics array when the page is loaded

// TODO: Functionalize
// CLICK LISTENER FOR GIFFETCHBUTTON 
$(".gifFetchButton").on("click", function () { //WHEN GIFFETCH BUTTON IS CLICKED EVENTLISTENER
    $(".gif").off(); //clearing previous event listeners from existing gifs to reattch here
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
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKey //structuring our queryURL based on GIPHY documentation
    $.ajax({ //OPENING ASYNCHRONOUS JSON AND XML CALL
        url: queryURL, //using queryURL structured variable TODO: Add limit parameter to queryURL
        method: "GET" //GET method for getting GIFs back as response JSON
    }).then(function(response) {  //function utilizing the JSON response object from GIPHY
        console.log(response , "response") //WORKING
        // for loop generating 10 gifs from the response JSON
        for (i = 0; i < 10; i++) { //FOR LOOP GENERATING GIFS FROM RESPONSE JSON
            
            ratingData = response.data[i].rating //saving access to JSON as variable
            console.log(ratingData , "response rating") //WORKING
            animatedURL = response.data[i].images.original.url //saving access to JSON as variable 
            stillURL = response.data[i].images.original_still.url //saving access to JSON as variable WORKING!!! SWAPPED TO STILL
            console.log(i , "itest") //WORKING
            console.log(animatedURL , "animatedURL outside gifCreator") //WORKING
            gifCreator() //RUNS gifCreator function (DEF Ln102) - Dynamically creates <img> tag with attr's and appends to #giphyDisplay
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
            gifSwapper(targetEvent , stillEvent , animatedEvent , stateEvent) //RUNS gifSwapper function (DEF Ln76) - Checks value of link-state from click event and swaps the active URL with the inactive URL, then adjusts link-state for subsequent clicks
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
    var gifContainer = $("<div>") //making a container to hold newGIF and ratingUpper
    gifContainer.addClass("col-md-3") //adding bootstrap styling classes
    var ratingContainer = $("<p>") //making a container to hold the ratingUpper data
    var ratingUpper = ratingData.toUpperCase() //setting ratingData to Upper Case
    ratingContainer.text("Rated: " + ratingUpper) //setting the text in our <p> container to ratingUpper
    var newGIF = $("<img>") //Making a new HTML image container for our GIF
    newGIF.attr("src" , stillURL) //adding stillURL as the img src to load still gif first
    newGIF.attr("animated-link" , animatedURL) //adding animatedURL as an attribute to call later
    newGIF.attr("still-link" , stillURL) //adding stillURL as an attribute to call later
    newGIF.attr("link-state" , "still") //adding a link-state attribute to hold status of gif still/animated
    newGIF.addClass("gif") //addClass for styling
    newGIF.addClass("img-thumbnail") //bootstrap class for styling
    console.log(animatedURL , "animatedURL inside gifCreator") //WORKING
    gifContainer.append(newGIF) //appending newGIF to our container
    gifContainer.append(ratingContainer) //appending the rating after our newGIF
    $("#giphyDisplay").append(gifContainer) //appending our new GIFs to the HTML container #giphyDisplay
    console.log(animatedURL , "animatedURL inside AFTER APPEND") //WORKING
}



// Getting the input value from our giphyInput and preventing default action of giphySubmit button
$("#giphySubmit").on("click", function() {
    event.preventDefault()
    console.log("Button on-click Test") //WORKING
    var searchTerm = $("#giphyInput").val().trim() //saving input field value as a variable
    // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKey //structuring our queryURL based on GIPHY documentation
    console.log (searchTerm , "searchTerm .val test") //WORKING

    if (topics.includes(searchTerm)) {
    alert("Uh oh! Looks like that button already exists!")
} else {
    topics.push(searchTerm) //adding the searchTerm to our array of topics
    console.log(topics , "topics after searchTerm push") //WORKING
    $("#buttonDisplay").empty() //emptying our button display to add a new button
    buttonGenerator(); //running buttonGenerator (DEF Ln 12) to regenerate our gifFetchButtons
    $(".gifFetchButton").on("click", function () { //WHEN GIFFETCH BUTTON IS CLICKED EVENTLISTENER
        $(".gif").off(); //clearing previous event listeners from existing gifs to reattch here
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
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKey //structuring our queryURL based on GIPHY documentation
        $.ajax({ //OPENING ASYNCHRONOUS JSON AND XML CALL
            url: queryURL, //using queryURL structured variable TODO: Add limit parameter to queryURL
            method: "GET" //GET method for getting GIFs back as response JSON
        }).then(function(response) {  //function utilizing the JSON response object from GIPHY
            console.log(response , "response") //WORKING
            // for loop generating 10 gifs from the response JSON
            for (i = 0; i < 10; i++) { //FOR LOOP GENERATING GIFS FROM RESPONSE JSON
                
                ratingData = response.data[i].rating //saving access to JSON as variable
                console.log(ratingData , "response rating") //WORKING
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
  } 
});


