// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {
  $(".devourBtn").on("click", function(event) {
    console.log("click registeed dvour btn clicked");
    event.preventDefault();
    var id = $(this).closest(".devour-form").find(".burger_id").val();
    console.log("id: "+id);
    var newEaten = $(this).data("neweaten");

    var newEatenState = {
      devoured: newEaten
    };

    // Send the PUT request.
    $.ajax(
      //"/api/burgers/" + id, 
      {
      url: `api/burger/${id}`,
      type: "PUT",
      data: newEatenState
    }).then(
      function() {
        console.log("changed eaten to", newEaten);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#text-enter-button").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#enter_text").val().trim(),
      devoured: $("[burger_name=devoured]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
