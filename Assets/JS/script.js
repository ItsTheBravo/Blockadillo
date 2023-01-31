// Variables to store the game state
let gameStarted = false;
let currentBlock;
let currentRow = 11;
let currentColumn = 0;
let intervalId;
let blockDirection = 1; // 1 = right, -1 = left
let blockSpeed = 1000;

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

// Move the block incrementally across the columns
function moveBlock() {
    currentColumn += blockDirection;
    currentBlock.style.gridColumnStart = currentColumn;
    if (currentColumn === 7) {
        blockDirection = -1;
    } else if (currentColumn === 0) {
        blockDirection = 1;
    }
}

// Check if the block is lined up with the center column
function checkPosition() {
    if (currentColumn === 4) {
        currentRow--;
        // Create a new block
        createBlock();
        intervalId = setInterval(moveBlock, 1000);
    } else {
        // The block is not lined up, reset the game
        alert("You lost!");
        currentRow = 11;
        currentColumn = 11;
        blockDirection = 1;
        // Remove the block
        currentBlock.remove();
        // Create a new block
        createBlock();
    }
}

// Handle start button click
function handleStartClick() {
    if (!gameStarted) {
        // Start the game
        gameStarted = true;
        // Create the first block
        createBlock();
        // Start the block moving
        intervalId = setInterval(moveBlock, 1000);
    }
}

// Handle stop button click
function handleStopClick() {
    // Stop the block
    clearInterval(intervalId);
    // Check the position
    checkPosition();
}

// Add event listeners to buttons
startButton.addEventListener("click", handleStartClick);
stopButton.addEventListener("click", handleStopClick);