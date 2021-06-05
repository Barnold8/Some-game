//GLOBAL VARIABLE DIFFICULTY 

diff = 100; //<-- Higher the number the more difficult, feel free to change this :) Good luck by the way


class Player{
  
  constructor(){
    
    this.pos = createVector(width/2,height/2);
    this.r = 32;
    this.score = 0;
 
    this.increase = 1.25;
    this.speed = 3;
  }

  show(){
    fill(255)
    ellipse(this.pos.x,this.pos.y,this.r);
  }
  
  move(){
    
    //this.speed = this.r * 0.025;
    
    let vel = createVector(mouseX,mouseY);
    vel.sub(this.pos)
    vel.setMag(2)
    this.pos.add(vel)
   // console.log(this.r)
  }

  grow(r){
    
    this.r += (pow(this.increase,4)) * PI;
    --this.score;
    this.col = 255 - this.r;
    
  }
  
  shrink(){
    
    this.r -= this.increase * PI;
    ++this.score;
    this.col = 255 + this.r;
    if(this.r <= 10){this.r = 10;}
  }
  
}

                              //I know for the classes I could use inheritance and then overload functions but this is just to pass the time

class collidable{
  
   constructor(r){
     
     let maxSpeed = 3;
     let minSpeed = -maxSpeed;
     
     this.pos = this.createPos(width,height);
     this.r = r;
     
     this.ID = random(0,1)
     
     this.opposingVel = createVector(random(minSpeed,maxSpeed), random(minSpeed,maxSpeed)) //this is the random speed that controls the balls direction velocity
     
     this.widthBounds = width + width*0.25;
     this.heightBounds = height + height*0.25;
   }
  
  show(){
    //console.log(this.ID)
    if(this.ID < 0.5){
      
      fill(37, 189, 32)
      
    }else{fill(189, 32, 32)}
    
   ellipse(this.pos.x,this.pos.y,this.r);
  }
  
  move(){
    
    this.pos.add(this.opposingVel);
    
    
    if(this.pos.x >= this.widthBounds ||
       this.pos.y >= this.heightBounds ||
       this.pos.x <= -this.heightBounds ||
       this.pos.y <= -this.heightBounds
     
      ){
      
      this.pos = this.createPos(width,height);
      
    }
    
  }
  
  createPos(w=width,h=height){ //Many functions calls for this function were written before I added the assignment operator to w and h. Im also too lazy to go through and delete them
    //console.log(this.widthBounds)
    
    let tempvec = createVector(random(0,w + w*0.25),
                               
                               random(0,h+ h*0.25));
    
    return tempvec;
    
  }

  
}


function setup() {
  createCanvas(800, 800);
  textSize(32);
  F = new Player()
  
  colls = [];
  
  for(i = 0; i < diff; i++){
    
    colls.push(new collidable(random(10,64),width) )
    
  }
 
  for(checkAmount = 100; 0 < checkAmount; checkAmount--){
    
    CheckSpawn();
    
  }
  
}

function draw() { 
  background(255);

 
  
  F.show()
  F.move()
  if(F.score <=0){F.score = 0}
  for(i = 0; i < colls.length; i++){
    
    colls[i].show();
    colls[i].move();
    if(Collision(colls[i],F)){
      
      if(colls[i].ID > 0.5 ){
        
        F.grow()
        colls[i].pos = colls[i].createPos(width,height);
    
      }else if(colls[i].ID < 0.5 ){
        
        F.shrink();
        colls[i].pos = colls[i].createPos(width,height);
        
      }
      
    }
  }
    if(F.r >= width){noLoop()
                     fill(0)
                     text(128)
    text("YOU LOSE. Refresh to restart :)", 0,height/2)
                    }
    fill(0,0,255)
   text(`The current score: ${F.score}`,width/3,height*0.05)
}

function Collision(Obj1,Obj2,by2=false){ // by2 allows me to override the size of the radius in the algorithm for the spawning system for the collidable objects
   // console.log("DETEC")
  
  
    let times = by2 ? 2 : 1;
  
    let dx = Obj1.pos.x - Obj2.pos.x;
    let dy = Obj1.pos.y - Obj2.pos.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

 
    if (distance < Obj1.r + Obj2.r*times) {
      //console.log("TRUE")
      return true;
    }
    else{return false;}



}

function CheckSpawn(){ // This is made because at line 99, if the 'if' is a while, it hangs the program and i dont want that. I think if I was to check multiple times the spawns should be okay, it also avoids a hang
  
    for(i = 0; i < colls.length; i++){
    
    if(Collision(colls[i],F,true)){
      
      colls[i].pos = colls[i].createPos();
      
    }
    
  }
  
  
}

