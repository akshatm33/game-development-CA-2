document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const flipsElement = document.getElementById("flips");
  const timeElement = document.getElementById("time-remaining");

  let flippedCards = [];
  let turns = 0;
  let matchedPairs = 0;
  let timer;

  // Set up event listeners for each card
  cards.forEach((card) => {
      card.addEventListener("click", () => flipCard(card));
  });

  // Function to flip a card
  function flipCard(card) {
      if (
          flippedCards.length < 2 &&
          !flippedCards.includes(card) &&
          !card.classList.contains("flip")
      ) {
          card.classList.add("flip");
          flippedCards.push(card);
          turns++;

          console.log("Turns:", turns); // Add this line to check the value of turns

          flipsElement.textContent = turns;

          if (flippedCards.length === 2) {
              // Wait for the third card to flip before checking for a match
              setTimeout(() => {
                  checkMatch();
                  flippedCards.forEach((card) => {
                      card.classList.remove("flip");
                  });
                  flippedCards = []; // Clear the flippedCards array after checking for a match
              }, 1000);
          }

          if (matchedPairs === cards.length / 2) {
              endGame();
          }
      }
  }

  // Function to check if the flipped cards match
  function checkMatch() {
      const [card1, card2, card3] = flippedCards;

      if (
          card1.querySelector(".front-face img").src ===
              card2.querySelector(".front-face img").src &&
          card1.querySelector(".front-face img").src ===
              card3.querySelector(".front-face img").src
      ) {
          card1.classList.add("matched");
          card2.classList.add("matched");
          card3.classList.add("matched");
          matchedPairs++;

          if (matchedPairs === cards.length / 2) {
              endGame();
          }
      } else {
          // Add a delay before flipping the unmatched cards back
          setTimeout(() => {
              if (!card1.classList.contains("matched")) {
                  card1.classList.remove("flip");
              }
              if (!card2.classList.contains("matched")) {
                  card2.classList.remove("flip");
              }
              if (!card3.classList.contains("matched")) {
                  card3.classList.remove("flip");
              }
          }, 500); // Adjust the delay as needed
      }

      flippedCards = [];
  }

  // Function to start the timer
  function startTimer(durationInSeconds) {
      let timeRemaining = durationInSeconds;

      timer = setInterval(function () {
          timeElement.textContent = timeRemaining + " sec";

          if (timeRemaining <= 0) {
              clearInterval(timer);
              endGame();
          } else {
              timeRemaining--;
          }
      }, 1000);
  }

  // Function to end the game
  function endGame() {
      clearInterval(timer);

      // Add any additional logic you need for the end of the game
      alert("Game Over! You've completed the game!");
  }

  // Start the timer when the page loads
  startTimer(30); // Set the duration of the game in seconds
});
const music = new Audio("./assets/good-night-160166.mp3");

// Wait for the audio to be loaded before playing
music.addEventListener('canplaythrough', function() {
    music.play();
    music.loop = true;
});

let selectedCards = [];

let cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', function () {
      if (this.classList.contains('flip')) {
          return;
      }

      this.classList.add('flip');

      selectedCards.push(this);

      if (selectedCards.length === 2) {
          let isMatch = selectedCards[0].querySelector('.back-face').src === selectedCards[1].querySelector('.back-face').src;

          if (isMatch) {
              selectedCards[0].classList.add('match');
              selectedCards[1].classList.add('match');
          }

          setTimeout(() => {
              selectedCards[0].classList.remove('flip');
              selectedCards[1].classList.remove('flip');

              if (!isMatch) {
                  selectedCards[0].classList.remove('match');
                  selectedCards[1].classList.remove('match');
              }

              selectedCards = [];

              let matchedCards = document.querySelectorAll('.match');

              if (matchedCards.length === cards.length) {
                  alert('Congratulations! You won');
              }
          }, 500);
      }
  });
});