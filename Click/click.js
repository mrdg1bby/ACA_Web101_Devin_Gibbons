//set variable at 0 monsters
var monstercount=0
//click to add monsters
function add(){
//adding monsters every click
    monstercount=monstercount+1
//changing text to add number for monsters
    document.getElementById('text').value=monstercount; 
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

var restart;
var that;
function restart() {
    var that = this;
    var restartButton = document.getElementById( 'restart' );
    eventUtility.addEvent(restartButton, 'click', function() {
        that.init();
    });
}