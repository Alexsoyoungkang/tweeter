/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// fake database
// contains an array of tweet objects, where each object represents
// a tweet and includes properties like the user's name, avatar and etc
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1687307355974
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1687393755974
  }
];


// Document Ready Event
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
          <span>${tweetObj.created_at}</span>
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

  const renderTweets = function(tweets) { // takes an array of tweet objects as input
    for (const tweet of tweets) { // loops through tweets
      const returnValue = createTweetElement(tweet); // calls createTweetElement for each tweet
      $('#tweets-container').append(returnValue);  // takes return value and appends it to the tweets container
    }
  };
  
  renderTweets(data);

  // Event listener for form submit
  $('form').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const data = $(this).serialize(); // Serialize form data
    console.log("data:", data);

    $.ajax({
      type: 'POST',
      data: data,
      url: "http://localhost:8080/tweets",
      success: function(res) { // method
        console.log(res);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
});
