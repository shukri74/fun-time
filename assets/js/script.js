$(".search").on("click", function(event) {
    event.preventDefault();
  
    // Here we grab the text from the input box
    var search = $("#search").val();
    var apiKey = "f41a02823b9a4150a843324d295e2ae9";
    console.log(search);
  
    // Here we construct our URL
    var queryURL = "https://api.rawg.io/api/games?key="+ apiKey +"&page_size=3&search=" + search;
  
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