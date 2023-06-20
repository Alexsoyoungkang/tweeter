
$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    const maxChars = 140;
    const counter = $(".counter");
    const inputChars = $(this).val().length;
    const remainingChars = maxChars - inputChars;
    counter.text(remainingChars); // updates the character counter display as the user types

    if (remainingChars >= 0) {
      counter.css("color", "#545149");
    } else {
      counter.css("color", "red");
    }
  });
});

