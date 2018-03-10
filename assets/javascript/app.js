//set up variables
//need the api key
console.log("hello")


//array of items for buttons
var seaCreatures = ["dolphin", "crab", "shark", "turtle", "sea lion"];
console.log(seaCreatures)

//1
// create a function that loops though the seaCreatures array
// for each item in the array create a button 
// add the item text to the button
// add classes to the button
// before appending empty current content in the buttonwrap
// append each button the the buttonwrap
function createButton(){
    $("#buttonwrap").empty()
    for (var i = 0; i < seaCreatures.length; i++){
        var button = $("<button>") 
        button.text(seaCreatures[i])
        button.addClass("btn btn-primary option")
        $("#buttonwrap").append(button)
    }
}
createButton();


//2 
// on click of #submit 
//  grab the input #search value
// store value in a variable ie newSeaCreature

// conditional
    // check if newSeaCreature is already in the seaCreature array
    // if its not there add it
    // call funtion in step 1
    // clear the input 
    // if it is there tell the user to try something else; use #alert
    // clear the input 
$("#submit").on("click", function(event){
    event.preventDefault()
    var userInput = $("#search").val().trim()
    userInput = userInput.toLowerCase()
    if (seaCreatures.indexOf(userInput) === -1 && userInput.length > 0)  // 0- n // -1 this will check if the user input is in the array
    {
        seaCreatures.push(userInput)
        createButton()
        $("#search").val("")
    }
    else {
        $("#alert").text("try something else")
        $("#search").val("")
    }
})


//3 
// on click on #search remove any text from #alert
$("#search").on("click", function(){
    $("#alert").text(" ")
})


//4 on click of .option button 
// get button text store to a variable
// create api query
// make ajax call
// console log result
$(document).on("click", ".option", function(){ //only use when any element you click on is added dynamically
    var selectButton = $(this).text()
    console.log(selectButton)
    var authKey = "&apikey=SMAj066wT0ihGKG0qdObtj1dx2Gpb9cb";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectButton + "&limit=10" + authKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(results){
        console.log(results.data)
        var gifsArry = results.data
        // call the function in step 5, pass in gifsArry
        createGifHtml(gifsArry)
    })
})

//5
// create a function that takes gifsArry as a argument
// get the rating
// add the rating to the p tag
// add an attr call src
// get the still link
// add the still link  to the src attr
// add attr call data-still and also add the still link to it
// add an attr call data-animate
// get the animated link
// add the animated link to it
// add an attr call data-state its value is "still"
// append each img and p tag to the div created l:86
// append the div to #gifwrap
    function createGifHtml(gifsArry){
        $("#gifwrap").empty()

        // loop through the results.data
        for (var i = 0; i < gifsArry.length; i++){
            // create a div
            var div = $("<div>")
            div.addClass("gWrap")
            // create a p tag
            var p = $("<p>")
            p.addClass("rating")
            p.text(gifsArry[i].rating)

        // create an image tag
            var img = $("<img>")
            img.addClass("gif")
            img.attr("data-state","still")
            img.attr("data-still", gifsArry[i].images.original_still.url)
            img.attr("data-animate", gifsArry[i].images.original.url)
            img.attr("src", gifsArry[i].images.original_still.url)
            $(div).append(img, p)
            $("#gifwrap").append(div)
        }
    }
    
// 6
// animate and then make it still
        $(document).on("click", ".gif", function(){
            var state = $(this).data("state")
            if (state === "still"){
                var url = $(this).data("animate")
                $(this).attr("src", url)
                $(this).data("state", "animate")
            }
            else {
                var url = $(this).data("still")
                $(this).attr("src", url)
                $(this).data("state", "still")
            }
        })