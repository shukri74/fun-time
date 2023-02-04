$( document ).ready(function() {
  var apiKey = "f41a02823b9a4150a843324d295e2ae9";
  // var queryURL = "https://www.freetogame.com/api/games";
  var queryURL = "https://api.rawg.io/api/games?key="+ apiKey +"&page_size=3";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var res = response.results;
    console.log(res)
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].name);
      // var imgURL = res[i].background_image;

      var cardDiv = $("<div>").attr("class","card");
      var cardImage = $("<img>").attr({class:"card-img-top",src:res[i].background_image});
      cardDiv.append(cardImage);
      var cardBody = $("<div>").attr("class","card-body");
      var cardTitle = $("<h5>").attr("class","card-title").text(res[i].name);
      cardBody.append(cardTitle);
      // var gHeading = $('<strong>').text('Genre: ');
      var genreP = $('<p>').text(res[i].genres[0].name);
      // genreP.text(res[i].genres[0].name);
      cardBody.append(genreP);
      var plateform = $('<p>').text(res[i].rating);
      cardBody.append(plateform);
      cardDiv.append(cardBody);
      var cardFooter = $("<div>").attr("class","card-footer");
      var releasedText = $("<small>").attr("class","text-muted").text(res[i].released);
      cardFooter.append(releasedText)
      cardDiv.append(cardFooter);
      $('#more-game-section').append(cardDiv);
    }
  });







  $(".search").on("click", function(event) {
    event.preventDefault();
  
    // Here we grab the text from the input box
    var search = $("#search").val();
    console.log(search);
  
    // Here we construct our URL
    queryURL='';
    queryURL = "https://api.rawg.io/api/games?key="+ apiKey +"&page_size=3&search=" + search;
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // $(".game").text(JSON.stringify(response));
      var results = response.results;
      
      console.log(results);
      for (let i = 0; i < results.length; i++) {
        var imgURL = results[i].background_image;
        var gameDiv = $("<div class='col-sm-4'>");
        var gameImage = $("<img>").attr({src: imgURL, width: "300px", height: "300px"});
        gameDiv.append(gameImage);
        var gameTitle = $("<h3>").text(results[i].name);
        gameDiv.append(gameTitle);
        var genreP = $("<p>").text(results[i].genres[0].name);
        gameDiv.append(genreP);
        var ratingP = $("<p>").text(results[i].rating);
        gameDiv.append(ratingP);
        var releasedDate = $("<p>").text(results[i].released);
        gameDiv.append(releasedDate);
        $("#game-section").append(gameDiv);

      }
      

    });
  
  
  });

});




