
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
    updateMoves();
    cardClick(event);
    updateStarRating();
    checkIfAllCardsMatch();
    clicked++;
}

/*
*@description Updates the moves count on each card click.
*/
function updateMoves()
{
    if(moves == 0)
    {
        startTime = performance.now();
    }
    moves++;
    const movesContainer = document.getElementById("moves-container");
    movesContainer.textContent = moves;
}

/*
*@description This is the main workflow that happens when a card is clicked.
    - It opens and shows the card
    - If its the first click then saves the state of the card and its css value.
    - If its the second click
        - Checks if user clicked on the same card twice, it hides the card.
        - If the user clicked on a different card
            - It checks if the fa- classname matches, if so it adds a new class called match to it and also disables it.
            - If it doesn't match it toggles both the first and second card to hide and temporarily disables other cards to prevent the user from continuously clicking other cards.
@param {Event} The event object that the target object is listening for.
*/
function cardClick(event)
{
    event.target.classList.toggle('open');
    event.target.classList.toggle('show');
    const listOfClasses = event.target.classList;

    listOfClasses.forEach(
        function(value, key, listObj) {
          if(value.includes("fa-"))
          {
              if(clicked == 1)
              {
                    previousClickedImage = event.target;
                    previousClickedImageCssValue = value;
              }
              if(clicked == 2)
              {
                    if(previousClickedImage !== event.target && value == previousClickedImageCssValue)
                    {
                        listOfClasses.add("match");
                        previousClickedImage.classList.add("match");
                        event.target.removeEventListener('click', cardClickWorkflow, false);
                        previousClickedImage.removeEventListener('click', cardClickWorkflow, false);                       
                    }
                    else
                    {
                        event.target.classList.toggle('no-match');
                        previousClickedImage.classList.toggle('no-match');
                        const lis = document.getElementById("deck-container").getElementsByTagName('li');

                        /*Disable click events while the settimeout function is running. */
                        for (let i=0; i<lis.length; i++)
                        {
                            lis[i].style.pointerEvents = 'none';
                        }
                        setTimeout(() => {
                            event.target.classList.toggle('open');
                            event.target.classList.toggle('show');
                            previousClickedImage.classList.toggle('open');
                            previousClickedImage.classList.toggle('show');
                            event.target.classList.toggle('no-match');

                            /*Enable click events*/
                            previousClickedImage.classList.toggle('no-match');
                            for (let i=0; i<lis.length; i++)
                            {
                                lis[i].style.pointerEvents = 'auto';
                            }

                        }, 500);

                    }
                    clicked = 0;
                    previousClickedImageCssValue = "";
              }
          }
        },
        "arg"
      );
}

/*
*@description Updates the stars depending on the number of moves made.
*/
function updateStarRating()
{
    if(moves== starRemove && starRemove < 58)
    {
        const starsContainer = document.getElementById("stars-container");
        const firstChild = starsContainer.firstElementChild;
        firstChild.remove();
        starRemove +=8;

    }
}

/*
*@description When all cards match
*/
function checkIfAllCardsMatch()
{
    const listOfMatches = document.getElementsByClassName("match");
    if(listOfMatches.length == 16)
    {
        const endTime = performance.now();
        const totalTime = ((endTime - startTime)/ (1000));
        const starsContainer = document.getElementsByClassName("fa-star");
        const starRating = starsContainer.length;
        const modal = document.getElementById('modalDialogWindow');
        const span = document.getElementsByClassName("close")[0];
        const modalText = document.getElementsByClassName('modal-text-content')[0];
        modalText.textContent = "Congratulations.You have won.!! You took " + totalTime.toFixed(2) + " seconds. You have a star rating of " + starRating;
        modal.style.display = "block";
        const modalButton  = document.getElementsByClassName("modal-button")[0];

        modalButton.onclick = function(){
            modal.style.display = "none";
            restartGame();
        }

        span.onclick = function() {
            modal.style.display = "none";
        }
    }
}

/*
*@description When user clicks to restart the game.
*/
function restartGame()
{
    clicked = 1;
    moves = 0;
    starRemove = 32;
    startTime = null;
    previousClickedImage = null;
    previousClickedImageCssValue = "";
    const lis = document.getElementById("deck-container").getElementsByTagName('li');
    for (let i=0; i<lis.length; i++) {
        lis[i].classList.remove("open");
        lis[i].classList.remove("show");
        lis[i].classList.remove("match");
    }
    createStarRating();
    const movesContainer = document.getElementById("moves-container");
    movesContainer.textContent = moves;
}

/*
*@description Creates the star rating section.
*/
function createStarRating()
{
    const starsContainer = document.getElementById("stars-container");
    const starsList = document.getElementsByClassName("fa-star");
    const starsNeeded = 5-starsList.length;
    const documentFragment =  document.createDocumentFragment();
    for(let i=0;i<starsNeeded;i++)
    {
        const listElement = document.createElement('li');
        listElement.className = "fa fa-star";
        documentFragment.appendChild(listElement);
    }
   starsContainer.appendChild(documentFragment);
}