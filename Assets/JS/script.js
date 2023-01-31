// Variables to store the game state
let gameStarted = false;
let currentBlock;
let currentRow = 11;
let currentColumn = 0;
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

// DOM elements
const gridContainer = document.getElementById("grid-container");

// Create a new block
function createBlock() {
    // Create a new div element for the block
    const block = document.createElement("div");
    block.classList.add("block");
    // Add the block to the grid container
    gridContainer.appendChild(block);
    // Set the current block
    currentBlock = block;
    currentBlock.style.gridRowStart = currentRow;
    currentBlock.style.gridColumnStart = currentColumn;
}


// Handle start button click
function handleStartClick() {
    console.log("Hello");
    startButton.disabled = true;
    stopButton.disabled = false;
    if (!gameStarted) {
        // Start the game
        gameStarted = true;
        // Create the first block
        createBlock();
    }
}

// Handle stop button click
function handleStopClick() {
    stopButton.disabled = true;
    startButton.disabled = false;
}

// Add event listeners to buttons
startButton.addEventListener("click", handleStartClick);
stopButton.addEventListener("click", handleStopClick);