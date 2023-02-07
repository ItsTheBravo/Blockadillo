// Variables to store the game state
let gameStarted = false;
let currentBlock;
let currentRow = 11;
let currentColumn = 0;
let intervalId;
let blockDirection = 1; // 1 = right, -1 = left
let blockSpeed = 800;
let score = 0;
let gamePaused = false;

// Error messages
const errorMessage = document.getElementById("error-message");

// DOM elements
const gameContainer = document.getElementById("game-container");
const gridContainer = document.getElementById("grid-container");
const overlays = document.getElementById("overlays");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const pauseButton = document.getElementById("pause-button");
const resumeButton = document.getElementById("resume-button");
const resetButton = document.getElementById("reset-button");

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

// The block is lined up, increase the score
function updateScore() {
    score++;
    scoreDisplay.textContent = score;
    currentRow--;
}

// If the player reaches the top of the board, they win
function checkWin() {
    if (score === 10) {
        overlays.classList.add("win");
    }
}

// Check if the block is lined up with the center column
function checkPosition() {
    if (currentColumn === 4) {
        checkWin();
        updateScore();
        // Create a new block
        createBlock();
        blockSpeed -= 50;
        intervalId = setInterval(moveBlock, blockSpeed);
    } else {
        // The block is not lined up, reset the game
        gameReset();
    }
}

//Reset the board
function gameReset() {
    console.log("Reset");
    score = 0;
    scoreDisplay.textContent = score;
    currentRow = 11;
    currentColumn = 0;
    blockDirection = 1;
    // Remove the block and all existing blocks
    currentBlock.remove();
    gridContainer.innerHTML = "";
    overlays.classList.remove("win");
    overlays.classList.remove("paused");
    // Clear current interval
    clearInterval(intervalId);
    // Create a new block
    createBlock();
    blockSpeed = 800;
    intervalId = setInterval(moveBlock, blockSpeed);
}

// Add try-catch statements around certain parts of the code to handle errors

try {
    // Handle start button click
    function handleStartClick() {
        if (!gameStarted) {
            // Start the game
            gameStarted = true;
            // Create the first block
            createBlock();
            // Start the block moving
            intervalId = setInterval(moveBlock, blockSpeed);
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
} catch (error) {
    console.error("Error starting or stopping the game:", error);
}

try {
    // Handle pause button click
    function handlePauseClick() {
        overlays.classList.add("paused");
        gamePaused = true;
        pauseButton.style.display = "none";
        resumeButton.style.display = "block";
    }

    // Handle resume click
    function handleResumeClick() {
        overlays.classList.remove("paused");
        gamePaused = false;
        pauseButton.style.display = "block";
        resumeButton.style.display = "none";
    }
} catch (error) {
    console.error("Error pausing or resuming the game:", error);
}

try {
    // Add event listeners
    startButton.addEventListener("click", handleStartClick);
    stopButton.addEventListener("click", handleStopClick);
    gridContainer.addEventListener("click", handleStopClick);
    // Pause the game
    pauseButton.addEventListener("click", handlePauseClick);
    // Resume the game
    resumeButton.addEventListener("click", handleResumeClick);
    // Reset the board
    resetButton.addEventListener("click", gameReset);
} catch (error) {
    console.error("Error adding an event listener:", error);
}