//set variable at 0 monsters
var monstercount=0
//click to add monsters
function add(){
//adding monsters every click
    monstercount=monstercount+1
//changing text to add number for monsters
    document.getElementById('text').value=monstercount; 
    var audio = document.getElementById("growl");
if (audio.paused) {
audio.play();
}
else {
audio.currentTime = 0
}
}

//save amount of monster rawrs in localstorage
function Save(){
    localStorage.setItem("monsterrawrs",monstercount)
}
//getting saved item to return back to save point 
function Load(){
    monstercount=localStorage.getItem("monsterrawrs");
    monstercount=parseInt(monstercount);
    document.getElementById('text').value=monstercount;   
}
//reset game
function restart(){
    document.getElementById("text").value = "";
    monstercount = 0;
}