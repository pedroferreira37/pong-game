# Pong Game in JavaScript

This is a simple implementation of the classic game Pong using JavaScript and the HTML5 canvas element. In this game, two players control paddles on either side of the screen and try to hit a ball back and forth, with the goal of making the ball pass the opponent's paddle. The game continues until one player reaches a certain score.

To run the game, simply open the HTML file in a web browser. The game consists of a canvas element with a width and height of 700 pixels. The game state includes two players, each with an x and y coordinate representing the position of their paddle, a ball with an x and y coordinate and a radius, and the score for each player.

The game can be played using the keyboard. Player 1 uses the up and down arrow keys to move their paddle up and down, respectively. Player 2 is controlled by an algorithm that moves their paddle up or down based on the position of the ball. The ball moves at a random speed and bounces off the walls and paddles in the game arena.

The game loop is set to run 30 times per second. The ball's position is updated every frame, and collisions are checked with the walls and paddles. If the ball collides with a paddle, its speed is reversed in the x direction.

The game also includes an observer pattern, where keyboard input is detected and sent to the game state via a command object. The game then updates its state based on the command.

This implementation is based on simple JavaScript functions and objects, making it easy to understand and modify.

## Features:

* Two player game: The game can be played by two players on the same computer.
* Random ball speed: The ball moves in a random direction and speed at the start of each game, making it more challenging and unpredictable.
* Ball collision detection: The game has collision detection to determine when the ball hits a paddle or the top/bottom of the screen.
* Score tracking: The game tracks the score for each player and displays it on the screen.
* Keyboard controls: Players can use the arrow keys to move their paddles up and down.

## Future Improvements:

* AI opponent: An AI opponent could be added to allow single player mode.
* Sound effects: Sound effects could be added to enhance the game experience.
* Multiplayer over the internet: The game could be modified to allow players to compete against each other online.
* Power-ups: Power-ups could be added to make the game more interesting, such as increasing paddle size or slowing down the ball.

### To run the game, simply open the HTML file in a web browser.
