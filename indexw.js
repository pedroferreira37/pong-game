const canvasScreen = document.getElementById('screen')

canvasScreen.width = 700
canvasScreen.height = 700

const canvasContext = canvasScreen.getContext('2d')


// Game factory
function createGame() {
	
    canvasContext.fillStyle = '#6A6AE2'
    
	const state = {
		
		players: {
            'player1': {x: 30, y: 20},
            'player2': {x: 660, y: 20}
        },
		paddle: {
			width: 5, 
			height: 100
		}, 
        ball: {
			x: Math.floor(canvasScreen.width / 2), 
			y: Math.floor(canvasScreen.height / 2), 
			r: 8,
			speed: { 
				x: Math.floor(Math.random() * 5 + 101 / 30),
				y: Math.floor(Math.random() * 5 + 101 / 30)
			}
		},
        score:{
            'player1': 0,
            'player2':0
        }
    }

    function movePlayer(command) {
      

        const acceptedMoves = {
            ArrowUp(player) {
                if(player.y - 10 >= 0) {
                    player.y = player.y - 20;
                }
            },
            ArrowDown(player) {
                if(player.y + 10 < canvasScreen.height - 95) {
                    player.y = player.y + 20;
                }
            }
        }

        const keyPressed = command.keyPressed;
        const player = state.players[command.playerId];
        const moveFunction = acceptedMoves[keyPressed] ;
        if(moveFunction) {
            moveFunction(player);
        }

        return;
    }
	
    return {
        movePlayer,
        state
    };
    
}

// Draw game
function drawGame() {
   
    // Arena
    canvasContext.fillStyle = 'white';
    canvasContext.clearRect(0,0,700,700);
	
	// Dashed lines
	canvasContext.strokeStyle = 'white';
    canvasContext.lineWidth = 5;
    canvasContext.setLineDash([20,5]);
    canvasContext.beginPath();
    canvasContext.moveTo(350, 698);
    canvasContext.lineTo(350,0);
    canvasContext.stroke();
    
	// Ball
	canvasContext.fillStyle = 'white';
    const ball = game.state.ball;
    canvasContext.beginPath();
    canvasContext.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    canvasContext.fill();
	
	// Paddles
    for(playerId in game.state.players) {
        const player = game.state.players[playerId];
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(player.x, player.y, game.state.paddle.width , game.state.paddle.height);
    }

    

    
    
    requestAnimationFrame(drawGame);
}

function createKeyboardListener() {
    
    const state = {
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        

        for(const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKey)

    function handleKey(event) {
        const keyPressed = event.key
        
        
    
        const command = {
            playerId: 'player1',
            keyPressed
        }
        notifyAll(command)
    }

    return {
        subscribe
    }
    
}

// Move ball
function moveBall() {
    game.state.ball.y = game.state.ball.y + game.state.ball.speed.y;
    game.state.ball.x = game.state.ball.x + game.state.ball.speed.x;
}



function checkColision(game) {
    
	const ball = game.state.ball;
	
	// Verifica colisão contra as bordas da arena
	
	
	if (ball.y - ball.r <= 0 || ball.y + ball.r >= canvasScreen.height) {
		ball.speed.y = -ball.speed.y;
	}
	
	// Verifica colisão contra a raquete do player 1
	if (ball.x - ball.r <= game.state.players['player1'].x + game.state.paddle.width
	       && ball.y >= game.state.players['player1'].y
		   && ball.y <= game.state.players['player1'].y + game.state.paddle.height) {
			   
		ball.speed.x = -ball.speed.x;
    }
	
	// Verifica colisão contra a raquete do player 2
	if (ball.x + ball.r >= game.state.players['player2'].x - game.state.paddle.width
	       && ball.y >= game.state.players['player2'].y
		   && ball.y <= game.state.players['player2'].y + game.state.paddle.height) {
			   
		ball.speed.x = -ball.speed.x;
    }

    
    
}

const game = createGame();
drawGame(game);


// Event with observer
const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(game.movePlayer);

setInterval(() => {
    moveBall()
    checkColision(game)
    
    movePlayerTwo()
    resetBallPosition()
    
    
}, 1000 / 30)



function movePlayerTwo() {
    let player = game.state.players.player2

    player.y = game.state.ball.y - 60
    
}

function resetBallPosition() {
    const ball = game.state.ball
    if(ball.x < 0) {
        ball.x = canvasScreen.width / 2
    }
}













