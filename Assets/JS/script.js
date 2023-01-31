// Variables to store the game state
let gameStarted = false;
let currentBlock;
let currentRow = 11;
let currentColumn = 0;
let intervalId;
let blockDirection = 1; // 1 = right, -1 = left
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


// Handle start button click
function handleStartClick() {
    startButton.disabled = true;
    stopButton.disabled = false;
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
    stopButton.disabled = true;
    startButton.disabled = false;
}

// Add event listeners to buttons
startButton.addEventListener("click", handleStartClick);
stopButton.addEventListener("click", handleStopClick);