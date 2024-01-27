
let flag = false;
let gradient = 1;
let number = 1;
let osc, env;
let synthesised = false;
let sampled = false;
let bonus = 0;

function preload(){
  ding = loadSound("assets/ding.wav"),
  paper = loadSound("assets/paper.wav"),
  d = loadSound("assets/note1-do.mp3"),
  r = loadSound("assets/note2-re.mp3"),
  m = loadSound("assets/note3-mi.mp3"),
  f = loadSound("assets/note4-fa.mp3"),
  s = loadSound("assets/note5-sol.mp3"),
  l = loadSound("assets/note6-la.mp3")
}

function setup() {
  // create the canvas using the full browser window
  createCanvas(windowWidth, windowHeight);

  // draw a border to help you see the size
  // this isn't compulsory (remove this code if you like)
  strokeWeight(5);
  // Note the use of width and height here, you will probably use this a lot 
  // in your sketch.
  rect(0, 0, width, height);
  background(0);

  osc = new p5.Oscillator();
  osc.setType("sine"); // "sine" or "triangle" or "sawtooth" or "square"
  env = new p5.Envelope();
  env.setADSR(0.01,0.05,0.1,0.5);
  osc.start();
  osc.amp(env);
}

function mouseClicked(){
  strokeWeight(5);
  noFill();
  if(number == 4){
    clear();
    background(0);
    paper.play();
    drawLine(width/2, 0, height, 20);
    noStroke();
    fill(255, 248, 220);
    circle(width/4, height/2, 100);
    circle(3*width/4, height/2, 100);
    number = number + 1;
  }else if(number == 5){
    if(dist(width/4, height/2, mouseX, mouseY) <= 50){
      // synthesised
      ding.play();
      synthesised = true;
      // triangle
      push();
      fill(34, 139, 34);
      noStroke;
      triangle(width/4, height/2-30, width/4-20, height/2+20, width/4+20, height/2+20);
      pop();
    }else if(dist(3*width/4, height/2, mouseX, mouseY) <= 50){
      // sampled
      ding.play();
      sampled = true;
      // triangle
      push();
      fill(34, 139, 34);
      noStroke;
      triangle(3*width/4, height/2-30, 3*width/4-20, height/2+20, 3*width/4+20, height/2+20);
      pop();
    }

  }else if(number < 4){
    // initial 3 circles
    ding.play();
    stroke(50, 150, 0);
    circle(mouseX, mouseY, 50 + number * 100);
    number = number + 1;
  }
}

function keyPressed(){
    // bonus
    if(bonus == 0 && key == '1'){
      bonus+=1;
    }else if(bonus == 1 && key == '1'){
      bonus+=1;
    }else if(bonus == 2 && key == '5'){
      bonus+=1;
    }else if(bonus == 3 && key == '5'){
      bonus+=1;
    }else if(bonus == 4 && key == '6'){
      bonus+=1;
    }else if(bonus == 5 && key == '6'){
      bonus+=1;
    }else if(bonus == 6 && key == '5'){
      bonus+=1;
    }else if(bonus == 7 && key == '4'){
      bonus+=1;
    }else if(bonus == 8 && key == '4'){
      bonus+=1;
    }else if(bonus == 9 && key == '3'){
      bonus+=1;
    }else if(bonus == 10 && key == '3'){
      bonus+=1;
    }else if(bonus == 11 && key == '2'){
      bonus+=1;
    }else if(bonus == 12 && key == '2'){
      bonus+=1;
    }else if(bonus == 13 && key == '1'){
      push();
      fill(255,205,60);
      star(random(width), random(height), random(30), random(70), 5);
      bonus = 0;
      pop();
    }else{
      bonus=0;
    }
    
    // synthesised
    push();
    if(synthesised){
      rectMode(CENTER);
      if(key == 'a'){
        env.play();
        osc.setType("triangle");
        osc.freq(200);
        stroke(random(255),random(255),random(255));
        square(random(0, width/2), random(height), random(50,200),20);
      }else if(key == 's'){
        env.play();
        osc.setType("sawtooth");
        osc.freq(1000);
        stroke(random(255),random(255),random(255));
        square(random(0, width/2), random(height), random(50,200),20);
      }else if(key == 'd'){
        env.play();
        osc.setType("square");
        osc.freq(800);
        stroke(random(255),random(255),random(255));
        square(random(0, width/2), random(height), random(50,200),20);
      }else if(key == 'w'){
        env.play();
        osc.setType("sine");
        osc.freq(600);
        stroke(random(255),random(255),random(255));
        square(random(0, width/2), random(height), random(50,200),20);
      }
    }
    pop();

  // sampled piano notes
  if(sampled){
    if (key == '5') {
      s.play();
      drawArrow(random(width/2,width), random(height),"up")
    } else if (key == '2') {
      r.play();
      drawArrow(random(width/2,width), random(height),"down")
    }else if (key == '1') {
      d.play();
      drawArrow(random(width/2,width), random(height),"left")
    }else if (key == '3') {
      m.play();
      drawArrow(random(width/2,width), random(height),"right")
    }else if (key == '4') {
      f.play();
      drawArrow(random(width/2,width), random(height),"pageup")
    }else if (key == '6') {
      l.play();
      drawArrow(random(width/2,width), random(height),"pagedown")
    }
  }
}

function drawArrow(x, y, direction){
  push();
  rectMode(CENTER);
  noStroke();
  fill(random(255), random(255), random(255))
  if(direction=="up"){
    triangle(x,y-50, x-25,y-25,x+25,y-25);
    rect(x,y,25,50);
  } else if(direction=="down"){
    triangle(x,y+50, x-25,y+25,x+25,y+25);
    rect(x,y,25,50);
  }else if(direction=="left"){
    triangle(x-25,y-25, x-25,y+25,x-50,y);
    rect(x,y,50,25);
  }else if(direction=="right"){
    triangle(x+25,y-25, x+25,y+25,x+50,y);
    rect(x,y,50,25);
  }else if(direction=="pageup"){
    triangle(x,y-50, x-25,y-25,x+25,y-25);
    rect(x,y,25,50);
  }else if(direction=="pagedown"){
    triangle(x,y+50, x-25,y+25,x+25,y+25);
    rect(x,y,25,50);
  }
  pop();
}

function drawLine(lineX, lineY, length, range){
  // draw curly lines
  push();
  noLoop();
  let oldX = lineX;
  let oldY = lineY;

  for(let y = lineY; y < lineY + length; y += 10){
    x = lineX + random(-range, range);
    if(flag){
      gradient= gradient-10;
      stroke(50+gradient,150,0);
      if(gradient<-20){
        flag=false;
      }
    }else{
      gradient = gradient+10;
      stroke(50+gradient,150,0);
      if(gradient>200){
        flag=true;
      }
    }
    line(oldX,oldY,x,y);
    oldX = x;
    oldY = y;
  }
  pop();
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// when you hit the spacebar, what's currently on the canvas will be saved (as a
// "thumbnail.png" file) to your downloads folder
function keyTyped() {
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }
}
