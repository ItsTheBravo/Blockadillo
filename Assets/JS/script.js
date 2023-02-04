// Variables to store the game state
let gameStarted = false;
let currentBlock;
let currentRow = 11;
let currentColumn = 0;
let intervalId;
let blockDirection = 1; // 1 = right, -1 = left
let blockSpeed = 1000;
let score = 0;
let gamePaused = false;


// DOM elements
const gameContainer = document.getElementById("game-container");
const gridContainer = document.getElementById("grid-container");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const pauseButton = document.getElementById("pause-button");
const resumeButton = document.getElementById("resume-button");

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
    if (!gamePaused) {
        currentColumn += blockDirection;
        currentBlock.style.gridColumnStart = currentColumn;
        if (currentColumn === 7) {
            blockDirection = -1;
        } else if (currentColumn === 0) {
            blockDirection = 1;
        }
    }
}

// Check if the block is lined up with the center column
function checkPosition() {
    if (currentColumn === 4) {
        // The block is lined up, increase the score
        score++;
        scoreDisplay.textContent = score;
        currentRow--;
        // Create a new block
        createBlock();
        blockSpeed -= 100;
        intervalId = setInterval(moveBlock, blockSpeed);
    } else {
        // The block is not lined up, reset the game
        alert("You lost!");
        score = 0;
        scoreDisplay.textContent = score;
        currentRow = 11;
        currentColumn = 0;
        blockDirection = 1;
        // Remove the block and all existing blocks
        currentBlock.remove();
        gridContainer.innerHTML = "";
        // Create a new block
        createBlock();
        blockSpeed = 1000;
        intervalId = setInterval(moveBlock, blockSpeed);
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
    console.log("Hello");
    // Stop the block
    clearInterval(intervalId);
    // Check the position
    checkPosition();
}



// Add event listeners
startButton.addEventListener("click", handleStartClick);
stopButton.addEventListener("click", handleStopClick);
gridContainer.addEventListener("click", handleStopClick);

// Pause the game
pauseButton.addEventListener("click", function () {
    gridContainer.classList.add("paused");
    gamePaused = true;
});

// Resume the game
resumeButton.addEventListener("click", function () {
    gridContainer.classList.remove("paused");
    gamePaused = false;
});