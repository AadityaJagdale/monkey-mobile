
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bg, BG;
var invisibleGround;
var Ogroup;
var Bgroup;
var ST=0;
var Ba=0;
var restart,RT,gameover,gameO;
var PLAY=1;
var END=0;
var gameState = PLAY;



function preload(){

 monkey_running =                loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png",  "monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  BG=loadImage("f.jpg");
  restart=loadImage("R.jpg");
  gameover=loadImage("go.png");
  
}



function setup() {

  createCanvas(750,550);

  bg=createSprite(100,300,100,100);
  bg.addImage(BG);
  Bgroup=createGroup();
  Ogroup=createGroup();
 
   monkey=createSprite(180,470,20,20);
 
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.2;
   
   invisibleGround = createSprite(300,520,600,10);
   invisibleGround.visible = false;
  
}


function draw() {
  
 background(255);
 bg.velocityX=-5;
 if (bg.x < 250){
 bg.x = bg.width/2;
}
   
if(gameState === PLAY){
 Ogroup.setVelocityEachX = -(4 + 3* ST/50)
 Bgroup.velocityX = -(4 + 3* ST/50)

 ST = ST + Math.round(getFrameRate()/60);
 
  
if (bg.x < 0){
 bg.x = bg.width/2;
}

                              
if(keyDown("space")&& monkey.y >= 400) {
 monkey.velocityY = -20;

}

 monkey.velocityY = monkey.velocityY + 0.8

                                
 O();
 B();
 gameO=createSprite(350,240);
 gameO.addImage(gameover);
 gameO.scale=0.3;
 
 RT=createSprite(360,350);
 RT.addImage(restart);
 RT.scale=0.5;
 gameO.visible = false;
 RT.visible = false;


if(Ogroup.isTouching(monkey)){
 gameState = END;
}
  
if(Bgroup.isTouching(monkey)){
 Ogroup.destroyEach(0);
 Bgroup.destroyEach();

   Ba =Ba+1 }

}
  
  
else if (gameState === END) {
 gameO.visible = true;
 RT.visible = true;
 bg.velocityX = 0;
 
 monkey.velocityY = 0

if(mousePressedOver(RT)) {
 reset();
}
      
     

 Ogroup.setLifetimeEach(-150);
 Ogroup.setVelocityXEach(0);
     
 Bgroup.setLifetimeEach(-150);
 Bgroup.setVelocityXEach(0);
    
 }
 
 
drawSprites();
 textSize(30);
 fill("yellow");
 textFont("algerian");
 text("survival time:"+ST,50,30);

 textSize(30);
 fill("yellow");
 textFont("algerian");
 text("banana:"+Ba,50,60);
 monkey.collide(invisibleGround);
  
 
}

function reset(){
                    
  gameState=PLAY;
  gameO.visible=false;
  RT.visible=false;
  Ogroup.destroyEach();
  Bgroup.destroyEach();
  Ba=0;
  ST=0;
}


function O(){
 obstacle=createSprite(770,500,20,20);

if(World.frameCount%100===0){
 obstacle.addImage(obstacleImage);
 obstacle.scale=0.5;
 obstacle.velocityX=-15;
 obstacle.lifetime=150;
 }

 Ogroup .add(obstacle);


}

function B(){
 banana=createSprite(800,200,20,20);

                                                       if(World.frameCount%100===0){
 banana.y=Math.round(random(150,300));
 banana.addImage(bananaImage);
 banana.scale=0.2;
                                                        banana.velocityX=-10;
                                                        banana.lifetime=150;
 
 Bgroup.add(banana);
 
 }
}