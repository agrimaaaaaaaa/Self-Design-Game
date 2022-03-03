var PLAY=1;
var END = 0;
var gameState = PLAY

var boy_running,boy_collided, boy
var backgroundImage, background

var obstaclesGroup, rock, squirrel, bird

var score=0;
var gameOver, restart;

function preload() {
boy_running = loadAnimation("boyrunning1.png","boyrunning2.png","boyrunning3.png");
boy_collided = loadAnimation("boy_collided.png")

rock = loadImage("rock.jpg");
squirrel = loadImage("squirrel.jpg");
bird = loadImage("bird.png");
backgroundImage = loadImage("Background.jpg");

gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}


function setup () {
   createCanvas(600,200);
   boy = createSprite(60,120,20,0);

   boy.addAnimation("running", boy_running);
   boy.addAnimation("collided", boy_collided);

   boy.scale = 0.7;

   background1 = createSprite ((200,180,400,20));
   background1.addImage("background",backgroundImage);
   background1.x = background1.width /2;
  background1.velocityX = -(6 + 3*score/100);

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300,140);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
 
  background(background1);
  
  text("Score: "+ score, 500,50);
  if (gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
    background1.velocityX = -(6 + 3*score/100);
  }
    if(keyDown("space") && boy.y >= 149) {
      boy.velocityY = -12;
   }
   boy.velocityY = boy.velocityY + 0.8

   spawnObstacles();
   if(obstaclesGroup.isTouching(trex)){
    gameState = END;
}
background1.velocityX = 0;
boy.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);
boy.changeAnimation("collided",boy_collided);

  drawSprites();
  }