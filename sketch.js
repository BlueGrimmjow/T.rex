var trex, trex_running, edges, pisoinvisible, Mnube, gameover, restart;
var groundImage, trexImg, gameoverImg, restartImg;
var suelo, nube;
var obs1, obs2, obs3, obs4, obs5;
var PLAY = 1, END = 0, estadodejuego = PLAY;
var jump, ponint, die;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  Mnube = loadImage ("Cloud.png");
  trexImg = loadImage ("trexC.png");
  gameoverImg = loadImage ("GameOver.png");
  restartImg = loadImage ("restart.png");
  
  obs1 = loadImage("Obstacle1.png");
  obs2 = loadImage("Obstacle2.png");
  obs3 = loadImage("Obstacle3.png");
  obs4 = loadImage("Obstacle4.png");
  obs5 = loadImage("Obstacle5.png"); 
  
  die = loadSound("die.mp3.mp3");
  jump = loadSound("jump.mp3.mp3");
  ponint = loadSound("checkPoint.mp3.mp3");
  
}

function setup(){
  createCanvas(600,200);
  
  //crea el Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("tiste", trexImg)
  edges = createEdgeSprites();
  suelo = createSprite (200,180,400,20);
  suelo.addImage ("suelo", groundImage);
  suelo.x = suelo.width / 2;
  
  pisoinvisible = createSprite (200,190,400,10);
  pisoinvisible.visible = false;
  
  grupoDeObstaculos = new Group();
  grupoDeNubes = new Group();
  
  //añade escala y posición al Trex
  trex.scale = 0.5;
  trex.x = 50;
  
  console.log("pelolita");
  
  score = 0;
  
  trex.setCollider("circle", 0,0,40);
  trex.debug = true;
  
  gameover = createSprite (300,100);
  gameover.addImage ("over", gameoverImg);
  restart = createSprite (300,140);
  restart.addImage ("restart", restartImg);
  restart.scale = 0.5
  
  var msj = "toma agua";
}


function draw(){
  //establece un color de fondo 
  background("pink");
  
  console.log("El estado de juego es", estadodejuego);
  
  if (estadodejuego === PLAY){
      gameover.visible = false;
      restart.visible = false;
    
      suelo.velocityX = -(2+3*score/100);
    
      
    
      if (score>0 && score % 100===0){
          ponint.play();
          }
     
      text ("marcador"+ score, 500,50);
      score=score+Math.round(getFrameRate()/60);
    
      if (suelo.x < 0){
      suelo.x = suelo.width / 2;
  }
      if(keyDown("space") && trex.y >=161){
      trex.velocityY = -10;
      jump.play();
  }
      trex.velocityY = trex.velocityY + 0.5;
    
      spawnClouds();
  
      spawnObstacle();
    
      if (grupoDeObstaculos.isTouching(trex)){
        estadodejuego = END;
        die.play();
      }
    
      }
  else if (estadodejuego === END){
      gameover.visible = true;
      restart.visible = true;
    
      suelo.velocityX = 0;   
      trex.velocityX = 0;  
    
      trex.changeAnimation("tiste", trexImg);
    
      grupoDeObstaculos.setVelocityXEach (0);
      grupoDeNubes.setVelocityXEach (0);
      grupoDeObstaculos.setLifetimeEach(-1);
      grupoDeNubes.setLifetimeEach(-1);
      
     if (mousePressedOver(restart)){
         reset();
         }
}
  
  trex.collide(pisoinvisible);
  
  console.log(frameCount);
  
  console.log(suelo.x);
  
  drawSprites();
}

function spawnClouds(){
  
    if (frameCount % 100===0){
        nube = createSprite(600,100,40,10);
        nube.velocityX = -3;
        nube.lifetime = 200;
        nube.addImage (Mnube);
        nube.y = Math.round (random(10,60));
        nube.scale = 0.4;
        nube.depth = trex.depth;
        trex.depth = trex.depth +1;
      
       grupoDeNubes.add(nube);
      
    }
}

function spawnObstacle (){
   if (frameCount % 60===0){
     var obstacle = createSprite (600,165,10,40);
     obstacle.velocityX = -(6+score/100);
     var ramp = Math.round(random(1,5));
     switch (ramp){
         
     case 1: obstacle.addImage(obs1);
         break;     
     case 2: obstacle.addImage(obs2);
         break; 
     case 3: obstacle.addImage(obs3);
         break; 
     case 4: obstacle.addImage(obs4);
         break; 
     case 5: obstacle.addImage(obs5);
         break; 
         default:break;
         
     }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    
     grupoDeObstaculos.add(obstacle);
     
   }
}

function reset (){
  estadodejuego = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  grupoDeObstaculos.destroyEach();
  grupoDeNubes.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  score = 0;
}
