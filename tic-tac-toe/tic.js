//an array to keep track of squares
var origBoard;
//person
const huPlayer = 'O';
//computer
const aiPlayer = 'X';
//array of winning combinations 
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
//cells variable stores cell data
const cells = document.querySelectorAll('.cell');
//start game function
startGame();
//starts at beginning and after clicking replay
function startGame() {
    //display none is the same in the html 
	document.querySelector(".endgame").style.display = "none";
    //array every number from 0-9
    origBoard = Array.from(Array(9).keys());
    //removes items from cells after clicking replay
    for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        //turn click function to change player
		cells[i].addEventListener('click', turnClick, false);
	}
}
//function pass in click event
function turnClick(square) {
//make sure a square can not be clicked twice
	if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, huPlayer)
//ai player taking turn
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
	}
}
//
function turn(squareId, player) {
    //show player who just clicked
    origBoard[squareId] = player;
    //wherever clicked an O appers for player
    document.getElementById(squareId).innerText = player;
    //check for winners after each click pass in board and player
	let gameWon = checkWin(origBoard, player)
    // if the game is won call the game won function 
    if (gameWon) gameOver(gameWon)
}
//check win function pass in the original board and player
function checkWin(board, player) {
    //find all places on board that have already been played. reduce method. Acumulator is value that gives back at end. 
    //e is the element in the board array 
    //i is the index
    let plays = board.reduce((a, e, i) =>
    //if the element equals the player concat i and add index to array
        (e === player) ? a.concat(i) : a, []);
    
    let gameWon = null;
    //check if game has been one with for of loop
	for (let [index, win] of winCombos.entries()) {
    //if every element in the win check if plays is more than -1 has the player played in all spots to equal a win
		if (win.every(elem => plays.indexOf(elem) > -1)) {
    // see what player won and what win combo 
            gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}
//game over function accepts gameWon
function gameOver(gameWon) {
//highlight all winning squares
	for (let index of winCombos[gameWon.index]) {
//set background color depends on who won game
        document.getElementById(index).style.backgroundColor =
        //turn operator
			gameWon.player == huPlayer ? "blue" : "orange";
    }
//check cells and make sure you cant click after win 
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
    }
// declare winner statement
	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}
//pass in who won
function declareWinner(who) {
//show end game section and display text from html
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}
//filter every element to see if the type of is a number to return 
function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}
//function for ai to find best spot to play 
function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}
//check tie function 
function checkTie() {
//every square is filled up and no one has won
	if (emptySquares().length == 0) {
//set colour to green and remove event listerer to pervent click
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
        }
//declare winner of tie game
		declareWinner("Tie Game!")
		return true;
    }
//if false return false
	return false;
}
//recursive function define with two arguments
function minimax(newBoard, player) {

	var availSpots = emptySquares();
// if O wins return 
	if (checkWin(newBoard, huPlayer)) {
        return {score: -10};
// if X wins return
	} else if (checkWin(newBoard, aiPlayer)) {
        return {score: 10};
// no more room to play so return 0
	} else if (availSpots.length === 0) {
		return {score: 0};
    }
// array called moves to collect scores and loop through empty spots   
    var moves = [];

	for (var i = 0; i < availSpots.length; i++) {
        var move = {};
//set index spot to index property 
        move.index = newBoard[availSpots[i]];
// set empty spot on new board to empty player
		newBoard[availSpots[i]] = player;
// call minimax function 
		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
            move.score = result.score;
//checks for win and if not keeps playing and checking for win
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}
//minimax resets new board 
		newBoard[availSpots[i]] = move.index;
//pushes move object to move array 
		moves.push(move);
	}
// evaulate for best move in move array 
    var bestMove;
//should choose move with highest score when ai is playing and the lowest score when the human is playing
	if(player === aiPlayer) {
        var bestScore = -10000;
//sets variable for low number 
		for(var i = 0; i < moves.length; i++) {
//if move has higher than best score the algorithm stores that move
			if (moves[i].score > bestScore) {
// if there are similar moves with the same score only the first will be stored
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
//same names for when player is set to human player 
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
//minimax looks for lowest score to store
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
//minimax stores object stored in best move
	return moves[bestMove];
}