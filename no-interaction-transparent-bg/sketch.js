let numParticles = 60;
let particleSize = 36;
let numMiniParticles = 14;

let particles = [];
let miniParticles = [];
let emojiFileNames = ["1f9d0","1f60a","1f60b","1f60c","1f60d","1f61d","1f61e","1f61f","1f62a","1f62b","1f92b","1f92c","1f92d","1f92e","1f92f","1f604","1f605","1f606","1f607","1f608","1f614","1f615","1f616","1f617","1f618","1f624","1f625","1f626","1f627","1f628","1f634","1f635","1f636","1f637","1f637","1f641","1f912","1f913","1f914","1f915","1f917","1f927","1f928","1f929","1f970","1f971"];
let emojis = [];

// let particle;
let particleGraphics;

function generateOriginPos(){
  let origin = random([[random(width),random(-10,-20)], [random(width),height+random(10,20)], [random(-10,-20), random(height)], [width+random(10,20), random(height)]])
  return {x: origin[0], y: origin[1]}
}
function generateVel(){
  return random(2, 4) * random([-1, 1]);
}

class MiniParticle {
  constructor(originX, originY) {  
      const x = originX;
      const y = originY;
      const dx = generateVel()/2;
      const dy = generateVel()/2;
      this.pos = createVector(x, y);
      this.vel = createVector(dx, dy)
      this.img = random(emojis);
      this.rotation = random(180);
      this.size = random(25, 35);
  }
  update() {
      this.pos.add(this.vel);
      this.size-=0.5;
      if (this.size <=2){
        let thisIndex = miniParticles.indexOf(this);
        miniParticles.splice(thisIndex, 1);
      }
  }
  draw() {
      const { x, y } = this.pos;

      noStroke();
      push();
          translate(x,y);
          rotate(this.rotation)
          image(this.img, -this.size/2, -this.size/2, this.size, this.size);
      pop();
  }  

}


class Particle {
    constructor(originX, originY) {
      const x = originX;
      const y = originY;
      const dx = generateVel();
      const dy = generateVel();
      this.pos = createVector(x, y);
      this.vel = createVector(dx, dy)
      this.img = random(emojis);
      this.rotation = random(180);
    }
    
    detectEdges() {
      const { x, y } = this.pos;
      const radius = particleSize/2;
      
      if (x - radius < -50 || x + radius > width + 50 || y - radius < -50 || y + radius > height + 50) {
        let originPos = generateOriginPos();
        this.pos.x = originPos.x;   
        this.pos.y = originPos.y;     
        this.vel.x = generateVel();   
        this.vel.y = generateVel();      
      }
    }

    detectCollision(){
      const { x, y } = this.pos;

      for (let i=0;i<particles.length;i++){
        let p = particles[i]
        let distance = dist(x, y, p.pos.x, p.pos.y);
        if (distance <= particleSize/2 && distance != 0){
          for (let i=0;i<numMiniParticles;i++){
            miniParticles.push(new MiniParticle(x, y))
          }
          // get rid of the particle that exploded
          particles.splice(i, 1)

          // make a new particle
          // let originPos = generateOriginPos();
          // particles.push(new Particle(originPos.x, originPos.y));

        } 
      }
    }
    
    updatePos() {
      this.pos.add(this.vel);
      this.rotation += this.vel.x/150;
      this.detectCollision();
      this.detectEdges();
    }
   
    
    draw() {
        const { x, y } = this.pos;
  
        noStroke();
        push();
          translate(x,y);
          rotate(this.rotation)
          image(this.img, -particleSize/2, -particleSize/2, particleSize, particleSize);
        pop();
    }  
}

function preload(){
  for (let emojiFileName of emojiFileNames){
    let img = loadImage(`../emojis-smaller/${emojiFileName}.png`);
    emojis.push(img);
  }
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    // background('#52fa95');

    for (i=0;i<numParticles;i++) {
        let originPos = generateOriginPos();
        particles.push(new Particle(originPos.x, originPos.y));
    }

    particleGraphics = createGraphics(windowWidth, windowHeight);
    // particleGraphics.background(220); 
    // particle = new Particle();
}

function draw(){
    clear();

    particles.forEach((p) => {
        p.updatePos();
        p.draw();
    });
    miniParticles.forEach((p) => {
        p.update();
        p.draw();
    });

    

    // generate another one every 10 frames
    if (frameCount % 10 == 0){
         let originPos = generateOriginPos();
         particles.push(new Particle(originPos.x, originPos.y));
    }

    
    // particle.render();
    // particle.update();

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}