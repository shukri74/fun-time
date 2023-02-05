$( document ).ready(function() {
  // var firstApiKey = "6d8cefb524msh8e89bc188680a3ap10ab72jsne7d1c162c88c";
  var firstApiURL = "https://free-to-play-games-database.p.rapidapi.com/api/games";

  var secondApiKey = "f41a02823b9a4150a843324d295e2ae9";
  var secondApiURL = "https://api.rawg.io/api/games?key="+ secondApiKey +"&page_size=8";

  $.ajax({
    url: firstApiURL,
    headers: {
      "X-RapidAPI-Key": "6d8cefb524msh8e89bc188680a3ap10ab72jsne7d1c162c88c",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com"
    },
    method: "GET"
  }).then(function(response) {
    // var res = response.results;
    console.log(response)
    for (let i = 0; i < 8; i++) {
      console.log(response[i].thumbnail);
      var colDiv = $("<div>").attr('class','col-md-6 col-sm-12 my-3');

      var cardDiv = $("<div>").attr("class","card");
      var cardImage = $("<img>").attr({class:"card-img-top",src:response[i].thumbnail});
      cardDiv.append(cardImage);
      var cardBody = $("<div>").attr("class","card-body");
      var cardTitle = $("<h5>").attr("class","card-title").text(response[i].title);
      cardBody.append(cardTitle);
      var cardText = $("<p>").attr("class","card-text").text(response[i].short_description);
      cardBody.append(cardText);
      var genreHeading = $('<strong>').text('Genre: ');
      var genreP = $('<p>').text(response[i].genre);
      genreP.prepend(genreHeading);
      cardBody.append(genreP);
      var platformP = $('<p>').text(response[i].platform);
      var platformHeading = $('<strong>').text('Platform: ');
      platformP.prepend(platformHeading);
      cardBody.append(platformP);
      var gameUrl = $('<a>').attr({class:"btn btn-secondary",target:"_blank",href: response[i].game_url}).text("Game Live URL");
      cardBody.append(gameUrl);
      cardDiv.append(cardBody);
      var cardFooter = $("<div>").attr("class","card-footer");
      var releasedText = $("<small>").attr("class","text-muted").text(response[i].release_date);
      var releasedHeading = $('<strong>').text('Released Date: ');
      cardFooter.append(releasedText)
      releasedText.prepend(releasedHeading);
      cardDiv.append(cardFooter);
      colDiv.append(cardDiv);
      $('#game-section').append(colDiv);
    }
  });
  
  $.ajax({
    url: secondApiURL,
    method: "GET"
  }).then(function(response) {
    var res = response.results;
    // console.log(res)
    for (let i = 0; i < res.length; i++) {
      // console.log(res[i].name);
      var colDiv = $("<div>").attr('class','col-md-6 col-sm-12 my-3');

      var cardDiv = $("<div>").attr("class","card");
      var cardImage = $("<img>").attr({class:"card-img-top",src:res[i].background_image});
      cardDiv.append(cardImage);
      var cardBody = $("<div>").attr("class","card-body");
      var cardTitle = $("<h5>").attr("class","card-title").text(res[i].name);
      cardBody.append(cardTitle);
      var genreHeading = $('<strong>').text('Genre: ');
      var genreP = $('<p>').text(res[i].genres[0].name);
      genreP.prepend(genreHeading);
      cardBody.append(genreP);
      var ratingP = $('<p>').text(res[i].rating);
      var ratingHeading = $('<strong>').text('Rating: ');
      ratingP.prepend(ratingHeading);
      cardBody.append(ratingP);
      cardDiv.append(cardBody);
      var cardFooter = $("<div>").attr("class","card-footer");
      var releasedText = $("<small>").attr("class","text-muted").text(res[i].released);
      var releasedHeading = $('<strong>').text('Released Date: ');
      cardFooter.append(releasedText)
      releasedText.prepend(releasedHeading);
      cardDiv.append(cardFooter);
      colDiv.append(cardDiv);
      $('#more-game-section').append(colDiv);
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




