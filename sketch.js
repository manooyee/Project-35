//Create variables here
var dog;
var happydog;
var database;
var foodS;
var foodStock;

function preload()
{
  //load images here
  dogImage = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  //dog sprite
  dog = createSprite(230,250,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.15

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}

function draw() {  
  background(46,139,87);
  textSize(15);
  fill("white")
  text("Note:Press Up_Arrow Key To Feed Drago Milk",100,20);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  fill("white")
  textSize(20);
  text("Food Remaining = " +foodS, 150,150)

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}



