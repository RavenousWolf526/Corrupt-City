var path;
var pathImg;

var Car;
var CarImg;

var S1,S2,S3;
var S1G,S2G,S3G; 

var skeleton1,skeleton2,skeleton3;
var skeleton1Img,skeleton2Img,skeleton3Img;

var gameOver, restart, CorruptCityTitle;
var gameOverImg, restartImg, CorruptCityTitleImg;

var backgroundMusic,CarHorn;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("desertRoad.png");
  
  CarImg = loadImage("ApocolypseCar.png");
  
  skeleton1Img = loadImage("skeleton1.png");

  skeleton2Img = loadImage("skeleton2.png");
  
  skeleton3Img = loadImage("skeleton3.png");
  
  CarHorn = loadSound("carHorn.wav");

//  backgroundMusic = loadSound("The Wasteland.mp3");

  gameOverImg = loadImage("gameoverSkull.png");

  restartImg = loadImage("restartButton.png");

  CorruptCityTitleImg = loadImage("CorruptCityTitle.png");
}

function setup(){
  
createCanvas(1600,400);
// Moving background
path = createSprite(100,200);
path.addImage(pathImg);
path.velocityX = -5;

//Creating Sprites
Car = createSprite(70,50);
Car.addImage(CarImg);
Car.scale=0.8;
  
restart = createSprite(800,300);
restart.addImage(restartImg);
restart.scale = 0.4;

restart.visible = false;

//setting colliders
Car.setCollider("rectangle",0,0,30,30);
  
gameOver = createSprite(800,180);
gameOver.addImage(gameOverImg);
gameOver.scale = 1.2;
gameOver.visible = false;  

CorruptCityTitle = createSprite(810,22);
CorruptCityTitle.addImage(CorruptCityTitleImg);
CorruptCityTitle.scale = 0.8;


S1 = new Group();
S2 = new Group();
S3 = new Group();

}

function draw() {
  background("purple");
  
  
  //Apparently my computer can't process the music and it overheats :(
 // backgroundMusic.play();
 // backgroundMusic.setVolume(0.001);

  drawSprites();
  textFont("Impact")
  textSize(25);
  fill("black")
  stroke("white")
  strokeWeight(2)
  text("Distance(m): "+ distance,1260,30);
  
  textSize(15)
  textFont("Roboto")
  fill("black")
  stroke("white")
  strokeWeight(2)
  text("Created by TheRavenousWolf526", width - 1580, 20)

  if(gameState===PLAY){
    restartImg.visible = false;
   distance = distance + Math.round(getFrameRate()/60);
   path.velocityX = -(6 + 2*distance/150);
  
   Car.y = World.mouseY;
  
  // create(Skeletons1);
  // create(Skeletons2);
  // create(Skeletons3);


   edges= createEdgeSprites();
   Car.collide(edges);
  
  //code to reset the background
  if(path.x < 100 ){
    path.x = width/1.48;
  }
  
    //code to play car horn sound
  if(keyDown("space")) {
    CarHorn.play();
    CarHorn.setVolume(0.5);
  }
  
  
  //creating continous 
  var select_oppS = Math.round(random(1,3));
  
 /* if (World.frameCount % 150 == 0) {
    if (select_oppS == 1) {
      Skeletons1();
    } else if (select_oppS == 2) {
      Skeletons2();
    } else {
      Skeletons3();  
    }
  }
  */
   if(S1.isTouching(Car)){
     gameState = END;
     Car.velocityY = 0;
    }
    
    if(S2.isTouching(Car)){
      gameState = END;
      Car.velocityY = 0;
    }
    
    if(S3.isTouching(Car)){
      gameState = END;
      Car.velocityY = 0;
    }
    
}else if (gameState === END) {
    gameOver.visible = false;
    restart.visible = false;

  distance = 0
    textSize(20);
    fill(255);
    text("Click the Restart Button to play Again!", 500,200);
  
    path.velocityX = 0;
    Car.velocityY = 0;
  
    S1.setVelocityXEach(0);
    S1.setLifetimeEach(-1);
  
    S2.setVelocityXEach(0);
    S2.setLifetimeEach(-1);
  
    S3.setVelocityXEach(0);
    S3.setLifetimeEach(-1); 



if (mousePressedOver(restart)) {
  reset();
}
}
drawSprites();
}

function Skeletons1(){
        S1 =createSprite(1100,Math.round(random(50, 250)));
        S1.addImage(skeleton1Img);
        S1.scale =0.6;
        S1.velocityX = -(6 + 2*distance/150);
        S1.setLifetime=170;
        S1G.add(S1);
}

function Skeletons2(){
        S2 =createSprite(1100,Math.round(random(50, 250)));
        S2.addImage(skeleton2Img);
        S2.scale =0.6;
        S2.velocityX = -(6 + 2*distance/150);
        S2.setLifetime=170;
        S2G.add(S2);
}

function Skeletons3(){
        S3 =createSprite(1100,Math.round(random(50, 250)));
        S3.addImage(skeleton3Img);
        S3.scale =0.6;
        S3.velocityX = -(6 + 2*distance/150);
        S3.setLifetime=170;
        S3G.add(S3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  S1G.destroyEach();
  S2G.destroyEach();
  S3G.destroyEach();
  
  distance = 0;
 }



