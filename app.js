
$(document).ready(function() {

  // listen for enter/return key and run search function
  $("input").on("keypress", function keyboardSearch(event) {
    //keyCode 13 is Enter/Return key
    if (event.which === 13 && $("input").val() !== "") {
      search($("input").val());
    }
  });
});

function search() {

  // store search query in variable
  var keyword = document.getElementById("query").value;

  // request data from wikipedia
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + keyword + "&limit=10&namespace=0&format=json&warningsaserror=true&callback=?",
    success: function(data) {
      displayData(data);
    }

  });

  // when ajax request is successful, this function runs
  function displayData(data) {

    // remove old search results
    $("#searchResults").children().remove();

    // if zero search results do this
    if (data[1].length === 0) {
      var errorMessage = "<p>Oops, no search results found. Try again!</p>";
      $("#searchResults").append(errorMessage);

      // reset search query
      $("#query").val("");
    }
    else {

      //iterate through data, store each article title, summary and link in variables and display
      for(var i = 0; i < data[1].length; i++) {
        var title = data[1][i];
        var summary = data[2][i];
        var link = data[3][i];
        var display = '<li class="jumbotron list-group-item-action"><a class="list-style" href = ' + link + ">" + title + "</a><p>" + summary + "</p></li>";
        $("#searchResults").append(display);


        // reset search query
        $("#query").val("");
      }
    }
  }

}
