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
let totalRounds = 3; // Total number of rounds to play
let currentRound = 1; // Current round


// DOM elements
const gridContainer = document.getElementById("grid-container");
const overlays = document.getElementById("overlays");
const scoreDisplay = document.getElementById("score");
const roundDisplay = document.getElementById("round");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const pauseButton = document.getElementById("pause-button");
const resumeButton = document.getElementById("resume-button");
const resetButton = document.getElementById("reset-button");
const startOverlay = document.getElementById("start-overlay");

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
        blockSpeed *= 0.8;
        intervalId = setInterval(moveBlock, blockSpeed);
        gridContainer.style.backgroundColor = "green";
        setTimeout(function() {
            gridContainer.style.backgroundColor = "";
        }, 80);
    } else {
        // The block is not lined up, reset the game
        gridContainer.style.backgroundColor = "red";
        setTimeout(function() {
            gridContainer.style.backgroundColor = "";
        }, 80);
        gameReset();
    }
}

//Reset the board
function gameReset() {
    for (let i = 1; i <= totalRounds; i++) {
        if (currentRound < 3) {
            roundDisplay.textContent = currentRound++;
            break;
        } else if (currentRound === 3) {
            overlays.classList.add("win");
            break;
        }
    }

    score = 0;
    scoreDisplay.textContent = score;
    currentRow = 11;
    currentColumn = 0;
    roundDisplay.textContent = 0;
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
    blockSpeed = 1000;
    intervalId = setInterval(moveBlock, blockSpeed);
}
// Handle start button click
function handleStartClick() {
    try {
        if (!gameStarted) {
            // Start the game
            gameStarted = true;
            // Create the first block
            createBlock();
            // Start the block moving
            intervalId = setInterval(moveBlock, blockSpeed);
            // Show stop button
            stopButton.style.display = "block";
            // Hide Overlay
            startOverlay.style.display = "none";
            startButton.style.display = "none";
        }
    } catch (error) {
        console.error("Error starting or stopping the game:", error);
    }
}

// Handle stop button click
function handleStopClick() {
    try {
        // Stop the block
        clearInterval(intervalId);
        // Check the position
        checkPosition();
    } catch (error) {
        console.error("Error starting or stopping the game:", error);
    }
}


// Handle pause button click
function handlePauseClick() {
    try {
        overlays.classList.add("paused");
        gamePaused = true;
        pauseButton.style.display = "none";
        stopButton.style.display = "none";
        startButton.style.display = "none";
        resumeButton.style.display = "block";
    } catch (error) {
        console.error("Error pausing or resuming the game:", error);
    }
}

// Handle resume click
function handleResumeClick() {
    try {
        overlays.classList.remove("paused");
        gamePaused = false;
        pauseButton.style.display = "block";
        stopButton.style.display = "block";
        startButton.style.display = "block";
        resumeButton.style.display = "none";
    } catch (error) {
        console.error("Error pausing or resuming the game:", error);
    }
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