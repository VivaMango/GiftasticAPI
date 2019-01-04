console.log("API Test") //TESTING HTML/JS LINK !!SUCCESS!!

// Setting up our variables
var topics = ["apple" , "banana" , "orange" , "mango" , "pineapple" , "coconut" , "pear"]
//FOR AJAX
var APIKey = "YcQglRE4TS4xD2BTKk106HhEgiRLbsym" //VivaMango's GIPHY API Key
var searchTerm //defining to use later in AJAX on-click
var queryURL //defining to use later in response
var response
// var newGIF = $("<img>")
var stillURL
var animatedURL

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
buttonGenerator();


// CLICK LISTENER FOR GIFFETCHBUTTON 
$(".gifFetchButton").on("click", function () { //WHEN GIFFETCH BUTTON IS CLICKED EVENTLISTENER
    console.log(event.target , "event.target gifFetchButton")
    console.log(event.currentTarget , "event.currentTarget gifFetchButton")
    var eventTarget = event.currentTarget //WORKING - DOES NOT WORK WITH $()!!!
    console.log(eventTarget , "eventTarget var")
    var targetClass = $(event.currentTarget).attr("class") //WORKING - NEEDS $() TO WORK!!!
    console.log(targetClass , "targetClass var")
    var searchTerm = $(this).data("buttontext") //USING THE DATA ATTRIBUTE BUTTONTEXT TO DECLARE searchTerm
    console.log(searchTerm , "buttonclick searchTerm test") //WORKING
    var APIKey = "YcQglRE4TS4xD2BTKk106HhEgiRLbsym"
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKey //structuring our queryURL based on GIPHY documentation
    $.ajax({ //OPENING ASYNCHRONOUS JSON AND XML CALL
        url: queryURL, //using queryURL structured variable
        method: "GET" //GET method for getting GIFs back as response JSON
    }).then(function(response) {  //function utilizing the JSON response object from GIPHY
        // for loop generating 10 gifs from the response JSON
        for (i = 0; i < 10; i++) { //FOR LOOP GENERATING GIFS FROM RESPONSE JSON
            animatedURL = response.data[i].images.original.url //saving access to JSON as variable 
            stillURL = response.data[i].images.original_still.url //saving access to JSON as variable WORKING!!! SWAPPED TO STILL
            console.log(i , "itest")
            console.log(animatedURL , "animatedURL outside gifCreator")
            gifCreator() //RUNS gifCreator function (DEF Ln108) - Dynamically creates <img> tag with attr's and appends to #giphyDisplay
            gifSwapper() //testing gifSwapper Event.target

             //STATESWAPPER () was here -MOVE OUT OF FOR LOOP BECAUSE CLICK EVENT
            
            
            // MARKED FOR DELETION, REFACTORED
             // var newGIF = $("<img>") //Making a new HTML image container for our GIF
            // var animatedURL = response.data[i].images.original.url //saving access to JSON as variable 
            // var stillURL = response.data[i].images.original_still.url //saving access to JSON as variable WORKING!!! SWAPPED TO STILL
            // var newGIF = $("<img>") //Making a new HTML image container for our GIF
            // newGIF.attr("src" , stillURL) //adding stillURL as the img src to load still gif first
            // newGIF.attr("animated-link" , animatedURL) //adding animatedURL as an attribute to call later
            // newGIF.attr("still-link" , stillURL) //adding stillURL as an attribute to call later
            // newGIF.attr("link-state" , "still") //adding a link-state attribute to hold status of gif still/animated
            // newGIF.addClass("gif") //addClass for styling
            // // console.log(response.data[i] , "responsedata[i]") //WORKING
            // $("#giphyDisplay").append(newGIF) //appending our new GIFs to the HTML container #giphyDisplay
            // $(".gif").on("click" , function () { //onClick for our dynamically added gifs
            //     console.log("onclick GIF working") //WORKING BUT BUGGED - CONSOLE LOGS [i] times
            //     console.log(this , "this click test") //WORKING
            //     var linkState = $(this).attr("link-state") //saving access to link-state data attribute as variable
            //     if (linkState === "still") { //IF LINK STATE IS STILL (DEFAULT)
            //         console.log("image was still") //WORKING
            //         $(this).attr("src" , $(this).attr("animated-link")) //SWAPPING IMAGE LINK TO ANIMATED LINK
            //         $(this).attr("link-state" , "animated") //UPDATING link-state DATA ATTRIBUTE TO ANIMATED
            //     } else { //IF LINK STATE IS NOT STILL (ANIMATED)
            //         console.log("image was animated") //WORKING
            //         $(this).attr("src" , $(this).attr("still-link")) //SWAPPING IMAGE LINK TO STILL LINK 
            //         $(this).attr("link-state" , "still") // UPDATING link-state DATA ATTRIBUTE TO STILL
            //     }
            // })
            //MARKED FOR DELETION, REFACTORED






        }        
    });
})



//RUN THIS .on("click") using event.target attrs as params
function gifSwapper() { //function to swap between animated and still URLs. Takes three arguments, still-link attr and animated-link attr and link-state attr
    console.log((Event.currentTarget) , "gifSwapper event.target")
    
    // if (state = "still") {
    //     console.log("img was still")
    //     // $(this).attr("src" , $(this).attr("animated-link")) //SWAPPING IMAGE LINK TO ANIMATED LINK
    //     // $(this).attr("link-state" , "animated") //UPDATING link-state DATA ATTRIBUTE TO ANIMATED
    // } else {
    //     console.log("img was animated")
    //     // $(Event.target).attr("src" , $(this).attr("still-link")) //SWAPPING IMAGE LINK TO STILL LINK 
    //     // $(this).attr("link-state" , "still") // UPDATING link-state DATA ATTRIBUTE TO STILL
    // }
} 




// DECLARING OUR gifCreator function: ACCESSES JSON RESPONSE AND DYNAMICALLY ADDS <img> with attr's TO #giphyDisplay on index.html
function gifCreator () {
    // var animatedURL = response.data[i].images.original.url //saving access to JSON as variable 
    // var stillURL = response.data[i].images.original_still.url //saving access to JSON as variable WORKING!!! SWAPPED TO STILL
    var newGIF = $("<img>") //Making a new HTML image container for our GIF
    newGIF.attr("src" , stillURL) //adding stillURL as the img src to load still gif first
    newGIF.attr("animated-link" , animatedURL) //adding animatedURL as an attribute to call later
    newGIF.attr("still-link" , stillURL) //adding stillURL as an attribute to call later
    newGIF.attr("link-state" , "still") //adding a link-state attribute to hold status of gif still/animated
    newGIF.addClass("gif") //addClass for styling
    console.log("how many times am I running")
    console.log(animatedURL , "animatedURL inside gifCreator")
     // console.log(response.data[i] , "responsedata[i]") //WORKING
    $("#giphyDisplay").append(newGIF) //appending our new GIFs to the HTML container #giphyDisplay
    console.log(animatedURL , "animatedURL inside AFTER APPEND")
}

function stateSwapper () {
    $(".gif").on("click" , function () {
        if (linkState === "still") { //IF LINK STATE IS STILL (DEFAULT)
                    console.log("image was still") //WORKING
                    $(this).attr("src" , $(this).attr("animated-link")) //SWAPPING IMAGE LINK TO ANIMATED LINK
                    $(this).attr("link-state" , "animated") //UPDATING link-state DATA ATTRIBUTE TO ANIMATED
                } else { //IF LINK STATE IS NOT STILL (ANIMATED)
                    console.log("image was animated") //WORKING
                    $(this).attr("src" , $(this).attr("still-link")) //SWAPPING IMAGE LINK TO STILL LINK 
                    $(this).attr("link-state" , "still") // UPDATING link-state DATA ATTRIBUTE TO STILL
                }
    })
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
        $("#giphyDisplay").append(newGIF) 
    });
});


