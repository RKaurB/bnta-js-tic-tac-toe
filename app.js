// (will hold our game logic, and handle everything else we need)

// Store game status element for use later on
const statusDisplay = document.querySelector('.game--status');

//gameActive to pause the game in an end scenario
let gameActive = true;

// current player so we know who's turn it is 
let currentPlayer = "X";

// empty string in an array and allows us to track already played cells
let gameState = ["", "", "", "","", "", "", "", ""];

// Messages displayed during the game
const winningMessage = () => `Player ${currentPlayer} has won`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Initial message to let players know whose turn it is 
statusDisplay.innerHTML = currentPlayerTurn();

// These are all empty functions which we will use later on. If we initialise them here then we don't have the issue of initialising them in lower scopes and 
// then having to import them to higher scopes

function handleCellPlayed() {

}
function handlePlayerChange(){
    
}

function handleResultValidation() {
    
}
function handleCellClick() {

}
function handleNewGame() {
    
}

// Add event listeners to the game cells and newgame button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.newgame').addEventListener('click', handleRestartGame);


// eventHandlers

function handleCellClick(clickedCellEvent) {

        // Save clicked html element into clickedCell variable
        const clickedCell = clickedCellEvent.target; 
        // Target is a property of the event. The target event property returns the element that triggered the event.
        // We need this to be a number so we need to convert the const clickedCell, from what it is now (a string id) to an integer of 0-8

        constClickedCellIndex = parseInt(
            clickedCell.getAttribute('data-cell-index')
        );


// If the cell at index i is NOT empty, or the game state is NOT active, we don't want to do anything. So return nothing? as in do nothing
        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
        
}

function handleCellPlayed(clickedCell, clickedCellIndex) {

    // Update game state and UI to reflect played move
    
    // Accept click event .target (currently clicked cell), and index of clicked cell
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;  //we are using innerHTML here because we presumably want the html tags and spacing. We will try to change this later to innerText or innerContent and see what changes 
}

// Result validation - checking if game ended in win/draw or still in progress

// Create array of all possible winning combinations for player
// E.g. cell indexes 0, 1, & 2 (i.e. the three cells going across the first row), or cells 1, 4, & 7 (i.e. the three cells going across the first column, etc...)
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {

    // Declare and initialise roundWon variable to false
    let roundWon = false;

    // Array de-structuring
    // Loop through each winning combination in the winning combinations array
    for (let i = 0; i < 8; i++) {
        const winCombination = winningCombinations[i];  // let's say this is 0,1,2
        let a = gameState[winCombination[0]] //game state is an array  
        let b = gameState[winCombination[1]]
        let c = gameState[winCombination[2]]
        // Check if the winning combination indexes match with the current game state
        // If any of these indexes are not filled in, then player has not won yet
        if (a === "" || b === "" || c === "") {
            continue;
        }
        // If cell is not null, and 
        if (a === b && b === c) {
            // Round is won!
            roundWon = true;
            break;
        }
    }
    // If the match is won declare the winner and end game
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
}
