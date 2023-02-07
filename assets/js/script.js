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
    displayGames(response);
    
  });
  
  $.ajax({
    url: secondApiURL,
    method: "GET"
  }).then(function(response) {
    var res = response.results;
    displayMoreGames(res);
    // console.log(res)
    
  });


  $(".dropdown-item").on("click", function(event) {
    event.preventDefault();
  
    // Here we grab the text from the input box
    // var alphabetical = $("#alphabetical").text().toLowerCase();
    // console.log(alphabetical);
    var choice = $(event.target).val();
    console.log(choice);
  
    // Here we construct our URL
    var queryURL='';
    queryURL = "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by="+choice;
    $.ajax({
      url: queryURL,
      headers: {
        "X-RapidAPI-Key": "6d8cefb524msh8e89bc188680a3ap10ab72jsne7d1c162c88c",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com"
      },
      method: "GET"
    }).then(function(response) {
      var res = response;
      console.log(res)
      displayGames(res);
      
    });
  
  });

  $(".search").on("click", function(event) {
    event.preventDefault();
  
    // Here we grab the text from the input box
    // var alphabetical = $("#alphabetical").text().toLowerCase();
    // console.log(alphabetical);
    var search = $("#search").val();
    console.log(search);
  
    // Here we construct our URL
    var queryURL='';
    queryURL = "https://free-to-play-games-database.p.rapidapi.com/api/games?category="+search;
    $.ajax({
      url: queryURL,
      headers: {
        "X-RapidAPI-Key": "6d8cefb524msh8e89bc188680a3ap10ab72jsne7d1c162c88c",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com"
      },
      method: "GET"
    }).then(function(response) {
      var res = response;
      console.log(res)
      displayGames(res);
      
    });
  
  });

function displayGames(response) {
  $('#game-section').empty();
  
  for (let i = 0; i < 8; i++) {
    // console.log(response[i].thumbnail);
    // if(response[i].title != '/\d+/'){
      var formatedDate = moment(response[i].release_date).format('DD-MM-YYYY');
      var colDiv = $("<div>").attr('class','col-md-6 col-sm-12 my-3');

      var cardDiv = $("<div>").attr("class","card");
      var cardImage = $("<img>").attr({class:"card-img-top",src:response[i].thumbnail});
      cardDiv.append(cardImage);
      var cardBody = $("<div>").attr("class","card-body");
      var cardTitle = $("<h5>").attr("class","card-title").text(response[i].title);
      cardBody.append(cardTitle);
      var cardText = $("<p>").attr({class:"card-text text-wrap"}).text(response[i].short_description);
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
      var releasedText = $("<small>").attr("class","text-muted").text(formatedDate);
      var releasedHeading = $('<strong>').text('Released Date: ');
      cardFooter.append(releasedText)
      releasedText.prepend(releasedHeading);
      cardDiv.append(cardFooter);
      colDiv.append(cardDiv);
      $('#game-section').append(colDiv);
    // }
  }
}

function displayMoreGames(res) {
  $('#more-game-section').empty();

  for (let i = 0; i < res.length; i++) {
    // console.log(res);
    // console.log(res[i].name);
    var formatedDate = moment(res[i].released).format('DD-MM-YYYY');
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
    var ratingP = $('<span>').attr("class","stars").text(res[i].rating);
    // <span class="stars">4.8618164</span>
    var ratingHeading = $('<strong>').text('Rating: ');
    ratingP.prepend(ratingHeading);
    cardBody.append(ratingP);
    cardDiv.append(cardBody);
    var cardFooter = $("<div>").attr("class","card-footer");
    var releasedText = $("<small>").attr("class","text-muted").text(formatedDate);
    var releasedHeading = $('<strong>').text('Released Date: ');
    cardFooter.append(releasedText)
    releasedText.prepend(releasedHeading);
    cardDiv.append(cardFooter);
    colDiv.append(cardDiv);
    // $(function() {
    //   $('span.stars').stars();
    // });
    $('#more-game-section').append(colDiv);
  }
  
}


// for rating stars
// $.fn.stars = function() {
//   return $(this).each(function() {
//       // Get the value
//       var val = parseFloat($(this).html());
//       // Make sure that the value is in 0 - 5 range, multiply to get width
//       var size = Math.max(0, (Math.min(5, val))) * 16;
//       // Create stars holder
//       var $span = $('<span />').width(size);
//       // Replace the numerical value with stars
//       $(this).html($span);
//   });
// }



});




