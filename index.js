/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++){
        const game = games[i];

        const gameCard = document.createElement("div");

        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
        
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <img src="${game.img}" alt="${game.name}" class="game-img" />
        <p> Goal: ${game.goal}</p>
        <p> Backers: ${game.backers}</p>
        <p> Pledged: ${game.pledged}</p>
        
        `;

        gamesContainer.appendChild(gameCard);


    }


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (total, game) => {
    return total + game.backers;
}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = totalContributions.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce( (total, game) => {
    return total + game.pledged;
}, 0);

// set inner HTML using template literal

raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;

gamesCard.innerHTML = totalGames.toLocaleString();


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listUnfundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });
    //console.log(unfundedGames.length);


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listUnfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listFundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged > game.goal;
    });


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listFundedGames);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

function filterSearch(term){
    const filteredGames = GAMES_JSON.filter(game => {
        return game.name.toLowerCase().includes(term);
    });

    // Clear current games displayed
    deleteChildElements(gamesContainer);

    // Add the filtered games to the page
    addGamesToPage(filteredGames);
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let listUnfundedGames = GAMES_JSON.filter( (game) => {
    return game.pledged < game.goal;
});

const listUnfundedCount = listUnfundedGames.length;

const totalGamesStr = GAMES_JSON.length;

const totalRaisedStr = GAMES_JSON.reduce( (total, game) => {
    return total + game.pledged;
}, 0);

// const unfundedGamesStr = `A total of $${totalRaisedStr.toLocaleString('en-US')} has been raised for ${totalGamesStr > 1 ? 'games' : 'game'}. Currently, ${listUnfundedCount > 1 ? 'games' : 'game'} remain${listUnfundedCount > 1 ? 's' : ''} unfunded. We need your help to fund ${listUnfundedCount > 1 ? 'these' : 'this'} amazing game${listUnfundedCount > 1 ? 's' : ''}.`;




// create a string that explains the number of unfunded games using the ternary operator

const unfundedGamesStr = `A total of $${totalRaisedStr.toLocaleString('en-US')} has been raised for ${totalGames-listUnfundedCount} ${totalGamesStr > 1 ? 'games' : 'game'}. Currently, ${listUnfundedCount} ${listUnfundedCount > 1 ? 'games' : 'game'} remain${listUnfundedCount > 1 ? 's' : ''} unfunded. We need your help to fund ${listUnfundedCount > 1 ? 'these' : 'this'} amazing game${listUnfundedCount > 1 ? 's' : ''}.`;

// create a new DOM element containing the template string and append it to the description container

descriptionContainer.innerHTML = unfundedGamesStr;

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");
const thirdGameContainer = document.getElementById("third-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const[firstGame, secondGame, ...restGames] = sortedGames;
const lastGame = sortedGames[sortedGames.length-1];


// create a new element to hold the name of the top pledge game, then append it to the correct element

const topGameElement = document.createElement('div');
const runnerUpGameElement = document.createElement('div');
const unfundedGameElement = document.createElement('div');

topGameElement.innerHTML = `<h3>${firstGame.name}</h3>`;
runnerUpGameElement.innerHTML = `<h3>${secondGame.name}</h3>`;
unfundedGameElement.innerHTML = `<h3>${lastGame.name}</h3>`;

firstGameContainer.appendChild(topGameElement);
secondGameContainer.appendChild(runnerUpGameElement);
thirdGameContainer.appendChild(unfundedGameElement);

// do the same for the runner up item

const searcher = document.getElementById('search-bar');

searcher.addEventListener('input', function()  {
    const term = searcher.value.toLowerCase();
    filterSearch(term);
})