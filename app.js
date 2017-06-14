



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
      var errorMessage = "<p>No search results found.</p>";
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
        var display = '<li class="list-group-item-action"><a href =' + link + ">" + title + "</a><p>" + summary + "</p></li>";
        $("#searchResults").append(display);

        // reset search query
        $("#query").val("");
      }
    }
  }
}
