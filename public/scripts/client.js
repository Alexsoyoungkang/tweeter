/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Document Ready Event //
// waits for the document to be fully loaded and ready before executing any JavaScript.
// The data from the tweetObj is dynamically inserted into the appropriate places using ${} notation.
$(document).ready(function() {
  const createTweetElement = function(tweetObj) { // tweetObj as input, representing a single tweet
    const $tweet = $(`
      <article class="tweet">
        <header>
          <span>
            <img src=${tweetObj.user.avatars}>
            <span>${tweetObj.user.name}</span>
          </span>
          <span>${tweetObj.user.handle}</span>
        </header>
        <div class="tweet-text">
          <p>${tweetObj.content.text}</p>
        </div>
        <footer>
          <span>${timeago.format(tweetObj.created_at)}</span>
          <span>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </span>
        </footer>
        </article>
    `); // creates a new tweet element using the provided data.

    return $tweet; //This jQuery object represents the entire tweet element structure
  };

  // Render Tweets Function //
  const renderTweets = function(tweets) { // takes an array of tweet objects as input
    for (const tweet of tweets) { // loops through tweets
      const returnValue = createTweetElement(tweet); // calls createTweetElement for each tweet
      $('#tweets-container').prepend(returnValue);  // takes return value and appends it to the tweets container
    }
  };
  
  // Load Tweets Function //
  const loadTweets = function() {
    $.ajax("http://localhost:8080/tweets", { method: 'GET'}) // send GET request to this URL
      .then(function(tweets) { // successful response from the server. the 'tweets' parameter = response data retrived from the server aka the array of tweets
        renderTweets(tweets); // pass the tweets data to render the tweets on the page
      });
  };
  loadTweets();

  // Event Listener For Form Submit //
  $('form').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const data = $(this).serialize(); // Serialize form data
    console.log("data:", data);

    $.ajax({ // sends POST request to the server using Ajax
      type: 'POST',
      data: data, // serialized form data above
      url: "http://localhost:8080/tweets", // the server endpoint where the data should be sent
      success: function(res) { // method -  callback functions to handle the response from the server.
        console.log(res);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
});
