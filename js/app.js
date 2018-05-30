
let clicked = 1;
let previousClickedImageCssValue="";
let previousClickedImage = null;
let startTime = null;
let moves = 0;
let starRemove=32;
/*
 * @description Create a list that holds all of your cards.
 * @returns {array} Array of css classnames for all 16 cards.
*/
function listOfCards()
{
    const cards =  [
    "card fa fa-diamond", "card fa fa-paper-plane-o", "card fa fa-anchor",
    "card fa fa-bolt", "card fa fa-cube", "card fa fa-anchor", "card fa fa-leaf", "card  fa fa-bicycle",
    "card fa fa-diamond", "card fa fa-bomb", "card fa fa-leaf", "card fa fa-bomb", "card fa fa-bolt",
    "card fa fa-bicycle", "card fa fa-paper-plane-o", "card fa fa-cube"
    ];

    return cards;
}

/*
 * @description Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * @param {array} array
 * @returns {array} Shuffled array
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * @description set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


document.addEventListener('DOMContentLoaded',OnLoad);

/*
*@description This is the first function that is called after the DOM is loaded.
*/
function OnLoad()
{
    generateCardDeck();
    addListenersToCardsInDeck();
    const restartElement = document.getElementsByClassName("fa-repeat")[0];
    restartElement.addEventListener('click',restartGame);
}

/*
*@description Generates the deck of cards
*/
function generateCardDeck()
{
    const cards = listOfCards();
    const shuffledCards = shuffle(cards);
    let documentFragment =  document.createDocumentFragment();

    shuffledCards.forEach((cardClassNames, index) => {
        const listElement = document.createElement('li');
        listElement.className = cardClassNames;
        documentFragment.appendChild(listElement);
    });

    const deck = document.getElementById("deck-container");
    deck.appendChild(documentFragment);
}

/*
*@description Registers click event listeners to all the card elements.
*/
function addListenersToCardsInDeck()
{
    const lis = document.getElementById("deck-container").getElementsByTagName('li');

    for (let i=0; i<lis.length; i++) {
        lis[i].addEventListener('click', cardClickWorkflow, false);
    }
}

/*
*@description List of events triggered after a card is clicked.
*/
function cardClickWorkflow(event) {
   
}
