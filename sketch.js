var balloon,balloonImage1,balloonImage2;
var bg;
// create database and position variable here
function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  console.log(database);
  createCanvas(500,500);

  balloon=createSprite(100,400,20,20);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.addAnimation("hotAirBalloon1",balloonImage2);
  balloon.scale=0.4;

  textSize(20);
   var positionref=database.ref("balloon/height")
   positionref.on("value",readposition)
}

// function to display UI
function draw() {
  background(bg);
  if(keyDown(UP_ARROW)){
    writeposition(0,-5);
   balloon.changeAnimation("hotAirBalloon1",balloonImage2);
  }
  if(keyDown(DOWN_ARROW)){
    writeposition(0,5);
   balloon.changeAnimation("hotAirBalloon1",balloonImage2);
  }
  if(keyDown(RIGHT_ARROW)){
    writeposition(5,0);
   balloon.changeAnimation("hotAirBalloon1",balloonImage2);
  }
  if(keyDown(LEFT_ARROW)){
    writeposition(-5,0);
   balloon.changeAnimation("hotAirBalloon1",balloonImage2);
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
  function readposition(data){
    position=data.val();
    balloon.x=position.x;
    balloon.y=position.y;
  }

    function writeposition(x,y){
      database.ref("balloon/height").set({
        x:position.x+x,
        y:position.y+y
      })
    }