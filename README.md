# Block Stacking Game

This is a simple block stacking game built with HTML, CSS, and JavaScript. The game involves moving a block horizontally across a grid and trying to line it up with the center column. If the block is lined up, the player scores a point and a new block is created. The game ends when the player reaches a certain number of points or when they fail to line up the block.
Getting Started

To play the game, simply open the index.html file in a web browser. No additional installation or configuration is required.

## Game Controls

    Click the "Start" button to start the game.
    Click the "Stop" button to stop the block.
    Click anywhere on the game board to stop the block.
    Click the "Pause" button to pause the game.
    Click the "Resume" button to resume the game.

## Game Rules

    Move the block horizontally using the arrow keys.
    Try to line up the block with the center column.
    If the block is lined up, you score a point and a new block is created.
    If you reach a the top of the screen, you win the game.
    If you fail to line up the block, the game ends.

## Design 
I left my designing for the end of the project, I wanted to focus mostly on the javascript, but in the end didn't have the time to make the project look better.

## Features 
The site includes a fully playable game, it has a win screen and a pause screen. With buttons for play/pause and stopping the block by clicking the background or pressing stop.

The block is created by adding a class to the grid container. The block moves using the setInterval function, and it gets faster as the block moves up the container. I had an issue with this function where the block would have a second interval after game reset, but was solved by having clearInterval in the right place.

## Additional future features.
I wanted to add a few more things into the game but unfortunately due to personal time constraints I wasn't able to implement everything I wanted. I hope to continue this project later on and make it as I wanted.

1. Rounds System: I started to implement but didn't get time to finish, I wanted to have it so you could go for 3 rounds, and have your score total the average of the 3.
1. Leaderboards: Save the last 10 scores and rank them from highest to lowest.
1. Multiplayer: Add a second grid container and have players compete against each other for the higher score
1. API: I wanted to add a weather API to demonstrate the use, and change the background depending on the weather.

## Testing 
Project ran through validation for HTML/CSS/Javascript and used Lighthouse for page load.

## Bugs
1. I had an issue where sometimes the overlays don't appear when the game resets, and was hard to replicate, but adding a clear to the classes on reset mostly solves it.

1. The animation on the block isn't smooth and I wasn't sure how to solve it, when it moves left and right it sometimes "hangs" on the left side, and I wasn't able to make it smoother.

## Acknowledgements
Game was inspired by the arcade game Stacker.
