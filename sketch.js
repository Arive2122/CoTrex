
var trex ,trex_running,trex_collided,ground,invisibleground,groundimage;
var cloud,cloud_image;
var obstacle1, obstacle2, obstacle3, obstacle4,obstacle5,obstacle6,cloudsgroup,obstaclesgroup;
var score = 0
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover, gameover_image, restart, restart_image;
var jump_sound, checkpoint_sound,die_sound;


function preload(){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")  
trex_collided = loadImage("trex_collided.png")
groundimage = loadImage("ground2.png")
cloud_image = loadImage("cloud.png")
obstacle1 = loadImage("obstacle1.png")
obstacle2 = loadImage("obstacle2.png")
obstacle3 = loadImage("obstacle3.png")
obstacle4 = loadImage("obstacle4.png")
obstacle5 = loadImage("obstacle5.png")
obstacle6 = loadImage("obstacle6.png")
gameover_image = loadImage("gameOver.png")
restart_image = loadImage("restart.png")
jump_sound = loadSound("jump.mp3")
die_sound = loadSound("die.mp3")
checkpoint_sound = loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
 trex = createSprite (50, 180 , 20, 20);
 trex.addAnimation("running",trex_running)
 trex.addAnimation("collided",trex_collided)
 trex.scale = 0.5;
 
 ground = createSprite (300, 180, 600, 20)
 ground.addImage (groundimage)

 invisibleground = createSprite(300, 190, 600, 10);
 invisibleground.visible = false;
 obstaclesgroup = createGroup();
 cloudsgroup = createGroup();
 gameover = createSprite(300, 100)
 gameover.addImage(gameover_image)
 restart = createSprite(300, 140)
 restart.addImage(restart_image)
 restart.scale= 0.5
 restart.visible = false
 gameover.visible= false
}

function draw(){
  background("#454545")
  
  
  if (gamestate === PLAY){
    ground.velocityX = -(6+score/100)
    score = score+Math.round(frameCount/60)
    if (ground.x<0) {
      ground.x = ground.width/2
    }
    if (score>0 && score%1000==0 ){
      //checkpoint_sound.play();
    }
    if (keyDown("space") && trex.y>=161 ){

      trex.velocityY = -14
      jump_sound.play();
    }
    trex.velocityY = trex.velocityY + 0.8
    spawn_clouds();
spawnobstacles();
if (obstaclesgroup.isTouching(trex))
{
 gamestate = END  
 die_sound.play();
}

  }
  else if(gamestate === END){
    restart.visible = true
 gameover.visible= true
  ground.velocityX = 0;
  obstaclesgroup.setVelocityXEach(0);
  cloudsgroup.setVelocityXEach(0);
  cloudsgroup.setLifetimeEach(-1)
  obstaclesgroup.setLifetimeEach(-1)
  trex.velocityY = 0;
  trex.changeAnimation("collided",trex_collided);
  if (mousePressedOver(restart)){
    reset()

  }
  }
  text("Score:"+score,300,100)
  
  
  drawSprites();
 

trex.collide(invisibleground)

}

function reset() {
  gamestate = PLAY
  restart.visible = false
  gameover.visible = false
  obstaclesgroup.destroyEach()
  cloudsgroup.destroyEach()
  trex.changeAnimation("running",trex_running)
  score = 0
}
function spawn_clouds(){
  if(frameCount%60===0){

  cloud = createSprite(600,100,40,10);
  cloud.velocityX = -3;
  cloud.y = Math.round(random(10,100))
  cloud.addImage(cloud_image)
  cloud.scale = 0.5
  cloud.depth = trex.depth
  trex.depth = trex.depth + 1
  cloud.lifetime = 230
  cloudsgroup.add(cloud)
 
  }
}
function spawnobstacles(){
  if(frameCount%60===0){
    obstacle = createSprite(600,170,40,10)
    obstacle.velocityX = -(6+score/100);
  var cactus = Math.round(random(1,6))
  switch(cactus){
case 1: obstacle.addImage(obstacle1)
break;
case 2: obstacle.addImage(obstacle2)
break;
case 3: obstacle.addImage(obstacle3)
break;
case 4: obstacle.addImage(obstacle4)
break;
case 5: obstacle.addImage(obstacle5)
break;
case 6: obstacle.addImage(obstacle6)
break;
default: 
break;
  }
obstacle.scale = 0.5
obstacle.lifetime = 300
obstaclesgroup.add(obstacle)
  }
  

}

