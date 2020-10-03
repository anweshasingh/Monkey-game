var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup     
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 400);
  
 monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
}

function draw() { 
  background("white");
  monkey.collide(ground);
  
if(gameState === PLAY){
  if(ground.x < 0){
    ground.x = ground.width/2
  }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
  }
  
  if(keyDown("space") && monkey.y >=312.3){
    monkey.velocityY = -12;
  }
  
   monkey.velocityY = monkey.velocityY+0.8;
  ground.velocityX = -4;
  
  if(obstacleGroup.isTouching(monkey)){
    
    gameState = END;

  }
  food();
  spawnObstacle();
}
   else if (gameState === END){
    
  ground.velocityX = 0;
    monkey.velocityY = 0;
  
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
     stroke("yellow");
    textSize(20);
    fill("green");
    text("GAME OVER",220,120);
    
    survivalTime = 0;
  }  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " +survivalTime, 100,50);
  
}

function food(){
  if(frameCount%80 === 0){
    var banana = createSprite(500,5,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -10;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
    
  }
}

function spawnObstacle(){
  if(frameCount% 300 === 0){
    var obstacle = createSprite(500,315,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -10;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);

  }
}