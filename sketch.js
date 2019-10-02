var hball;
var database,position;
function setup(){
    database = firebase.database();
    createCanvas(500,500);
    hball = createSprite(250,250,10,10);
    hball.shapeColor = "red";
    var hballposition = database.ref('ball/position');
    hballposition.on("value",readposition,showerror);
}

function draw(){
    background("white");
    if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}
}
function changePosition(x,y){
    hball.x = hball.x + x;
    hball.y = hball.y + y;
}
function readposition(data){
    position = data.val();
    hball.x = position.x;
    hball.y = position.y;
}
function writeposition(x,y){
    database.ref('ball.position').set({
        'x':position.x + x,
        'y':position.y + y
    })
}
function showerror(){
    console.log('unable to work try reconnecting');
}
