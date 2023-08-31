const container = document.getElementById("under-container");
const scoreContainer = document.getElementById("score");
const attemptsContainer = document.getElementById("attempts");

let nb = 18; // Has to be a multiple of 2
let cardCollection = [];
let selectedCards = [];

var attempts = 0;
var score = 0;

main();

///////////////////////// Faire afficher pop quand le joueur a gagné
///////////////////////// Mettre sur GitHub

function init() {
  let cards = document.querySelectorAll("#card");
  for (let card of cards) {
    card.addEventListener("click", cardClickHandler);
  }
}

function main() {
  for (let i = 1; i < nb + 2; i = i + 2) {
    cardCollection[i] = Math.floor(i / 2);
    cardCollection[i + 1] = Math.floor(i / 2);
  }

  for (let i = 0; i < nb; i++) {
    let card = document.createElement("div");
    card.setAttribute("id", "card");

    do {
      var pickedCard = pickCard(getRandomInt(nb / 2));
    } while (pickedCard == -1);

    let img = document.createElement("img");
    img.setAttribute("src", "./images/(" + pickedCard + ").svg");

    container.appendChild(card);
    card.appendChild(img);
  }
}


function getRandomInt(max) {
  return Math.floor(1 + Math.random() * max);
}

function cardClickHandler() {
  givePoint(this);
  showCard(this);
}

// Return -1 if card number x isn't in card collection (already picked)
// Return number of card that is placed (and taken out of collection)
function pickCard(nb) {
  for (let cardNb in cardCollection) {
    if (cardCollection[cardNb] == nb) {
      cardCollection[cardNb] = 0; // Card is placed on board (and taken out of collection)
      return nb;
    }
  }
  return -1;
}

function showCard(card) {
  let cardImage = card.querySelector("img");
  if (card.style.backgroundColor != "grey") {
    cardImage.style.visibility = "visible";
  }
}

async function givePoint(card) {
  let cardImage = card.querySelector("img");
  selectedCards.push(cardImage.src);
  if (isTwoCardsSelected()) {
    if (isPair()) {
      console.log("Found a pair !");

      disableClick();
      await sleep(500);
      enableClick();
      
      disablePair(card);
      hideLastCards();
      updateScore();
      
      isWin();
    } else {
      updateAttempts();
    }
  }
  if (isThreeCardsSelected()) {
    let thirdCard = selectedCards[2];
    selectedCards = [];
    selectedCards[0] = thirdCard;
    hideLastCards();
    console.log("Attempt++");
  }
}

function hideLastCards() {
  let cardImages = document.querySelectorAll("#card");
  for (let card of cardImages) {
    card.querySelector("img").style.visibility = "hidden";
  }
}

function isTwoCardsSelected() {
  if (selectedCards.length == 2) {
    return 1;
  }
}

function isThreeCardsSelected() {
  if (selectedCards.length == 3) {
    return 1;
  }
}

function isPair() {
  if (selectedCards[0] == selectedCards[1]) {
    return 1;
  }
  return 0;
}

function disableClick() {
  document.body.style.pointerEvents = "none";
}

function enableClick() {
  document.body.style.pointerEvents = "auto";
}



function disablePair(card) {
  let pair = document.querySelectorAll("#card");
  for (let card of pair) {
    let relativePath = "./images/" + selectedCards[0].match(/[^\/]+$/);
    let selected = card.querySelector('[src="' + relativePath + '"]');
    if (selected != null) {
      selected.parentElement.removeEventListener("click", cardClickHandler);
      selected.parentElement.style.backgroundColor = "rgb(95, 95, 95)";
    }
  }
}

function updateScore() {
  score++;
  scoreContainer.textContent = "Score : " + score + "/" + nb/2;
}

function updateAttempts() {
  attempts++;
  attemptsContainer.textContent = "Attempts : " + attempts;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isWin() {
  if(score == nb/2){
    showWinPopup();
    return 1;
  }
}