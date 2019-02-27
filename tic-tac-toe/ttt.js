 function startGame() {
    document.turn="X"

     setMessage(document.turn + "gets to start.");
    }

var msg = "X gets to start!"

setMessage(msg);

function setMessage(msg){
    document.getElementById("messages").innerText=msg;
}

function nextMove(square){
    if (square.innetText =="") {
    square.innerText = document.turn;
    switchTurn();
}   else {
        setMessage("That square is already used.");
}
}

function switchTurn(){
    if (checkForWinner(document.turn)) {
        setMessage("Congratulations," + document.turn + "! You Win!");
    }   else if (document.turn == "X")
    if (document.turn == "X") {
        document.turn = "O";
    } else{
        document.turn = "X";
    }

    setMessage("It's" + document.turn + "'s turn!");
}

function checkForWinner(move){
    var result = false;
    if (checkRow(1,2,3,move) || 
        checkRow(4,5,6,move) || 
        checkRow(7,8,9,move) ||
        checkRow(1,4,7,move) ||
        checkRow(2,5,8,move) ||
        checkRow(3,6,9,move) ||
        checkRow(1,5,9,move) ||
        checkRow(3,5,7,move)) {
         
        result = true;
        }
        return result;
}

function checkRow(a, b, c, move){
    var result = false;
    if (getBox(a) == move && getBox(b) == move && getBox(c) == move){
        result = true;
    }
    return result;
    
}

function getBox(number){
    document.getElemenmtByID("s" + number).innerText;
}