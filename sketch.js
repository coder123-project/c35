//Create variables here
var  dog, happyDog,dogImg, database;
var frame;
var foodStock,foodS;
var fedTime,lastTime,lastFed;
var foodObj;
var feed,addFood, a;



function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
  
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


  dog = createSprite(800,200,10,10);
  dog.scale = 0.15
  dog.addImage(dogImg);

  frame = createSprite(500,390,1000,10);
  frame.shapeColor = "yellow";
  frame1 = createSprite(500,10,1000,10);
  frame1.shapeColor = "yellow";

  frame2 = createSprite(10,250,10,500);
  frame2.shapeColor = "yellow";

  frame3 = createSprite(990,10,10,500);
  frame3.shapeColor = "yellow";

  feed = createButton("Feed the dog");
   feed.position(700,95);
   feed.mousePressed(feedDog);

   addFood=createButton("Add Food");
   addFood.position(800,95);
   addFood.mousePressed(addFoods);

}


function draw() {  
background(46, 139, 87);
foodObj.display();
/*
if(keyWentDown(UP_ARROW)){
writeStock(foodS);
dog.addImage(happyDog);
}
*/


  //add styles here


  
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val();
  })

   textSize(15);
     fill("white");
   if(lastFed >= 12){
    text("Last Feed : " + lastFed%12 + " PM",350,30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : " + lastFed + " AM",350,30);
  }

  drawSprites();

   

}
//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



// function to update food stock and last time
function feedDog(){
  dog.addImage(happyDog);



  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  
  
  })
  console.log(hour());

 
}


// function to add foodin stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}



