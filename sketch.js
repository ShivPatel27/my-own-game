var engine, world;

var backgroundImg;


var zombie, zombierunning, zombiedie;
var warrior, warriorrunning,warriorattack, warriordie;
var zombiesGroup;
var ground;

var score = 0;

function preload() {
   getBackgroundImg();
     zombierunning = loadAnimation("zombie1.png","zombie2.png","zombie3.png","zombie4.png","zombie5.png","zombie6.png","zombie7.png","zombie8.png","zombie9.png");
     warriorrunning = loadAnimation("warrior1.png","warrior2.png","warrior3.png","warrior4.png","warrior5.png","warrior6.png","warrior7.png");
     zombiedie = loadAnimation("zombiedie1.png","zombiedie2.png","zombiedie3.png");

    warriorattack = loadAnimation("warriorattack1.png","warriorattack2.png","warriorattack3.png","warriorattack4.png","warriorattack5.png");
    warriordie = loadAnimation("warriordie1.png","warriordie2.png","warriordie3.png","warriordie4.png");
}

function setup(){
    createCanvas(1000,600);

    zombiesGroup = createGroup();


   
    warrior = createSprite(800,480,20,20);
    warrior.addAnimation("warriorisrunning", warriorrunning);
   
   
    
    //warrior.velocityX = -4;
    warrior.scale = 0.8;

    ground = createSprite(width/2 , 560, width, 70);
    ground.shapeColor = "brown";

   
}

function draw(){
   if(backgroundImg){
        background(backgroundImg);
   }
        noStroke();
        textSize(35)
        fill("black");
        text("Score  " + score, width-300, 50);
    
        spawnZombies();
        keyPressed();
        //mousepressed();
    
   drawSprites();
}

async function getBackgroundImg(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    console.log(hour);
    if(hour>=06 && hour<=20){
        bg = "daybg.jpg";
    }
    else{
        bg = "nightbg.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}

function spawnZombies(){

    if (frameCount % 60 === 0) {
    zombie = createSprite(100,500,20,20);
    zombie.addAnimation("running", zombierunning);
    zombie.velocityX = 1;
    zombie.scale = 0.5;
    zombie.x = Math.round(random(80, 120));
    zombie.lifetime = 1000;     
    zombiesGroup.add(zombie);
      }
}
function keyPressed(){
    if(keyCode ===  LEFT_ARROW){
      warrior.x = warrior.x - 4;
     
    }
    if(keyCode ===  RIGHT_ARROW){
        warrior.x = warrior.x + 4;
    
    }
    if(keyCode === 32){
        warrior.valocityX = 0;
    }
      
}
function mousePressed(){
    console.log("hello");
    warrior.changeAnimation("warriorisrunning", warriorattack);
}