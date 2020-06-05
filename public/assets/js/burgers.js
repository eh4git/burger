// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-devoured").on("click", function(event) {
    // console.log("click registered devour btn clicked");
    // event.preventDefault();
    var id = $(this).data("id")
    var newEaten = $(this).data("neweaten");

    var newEatenState = {
      devoured: newEaten
    };
console.log(newEatenState)
    // Send the PUT request.
    $.ajax(
      "/api/burgers/" + id, 
      {
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

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#ca").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
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
  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});