var boids = [],
	maxDrawing = 330,
	drawCount = 0,
  numBoids = 400,
  numTriangles = 10,
  boidGroups = [],
  numRounds = 3

function setup() {
  createCanvas(500, 500);
  colorMode(HSB)
  // blendMode(DODGE)
  blendMode(MULTIPLY)
  // Add an initial set of boids into the system
  for (var i = 0; i < numBoids; i++) {
    let centerX = width / 2,
      centerY = height / 2,
      range = width / 2
    boids[i] = new Boid(centerX + random(range) - range / 2, centerY + random(range) - range / 2, i);
    // boids[i] = new Boid(random(width), centerX + random(range/5) - range / 10, i);
  }

  background('#fff');

  for (let i = 0; i < numTriangles; i++) {
    boidGroups[i] = [
        boids[Math.floor(random(numBoids))], 
        boids[Math.floor(random(numBoids))], 
        boids[Math.floor(random(numBoids))],
        boids[Math.floor(random(numBoids))]
        ]
  }

  noFill()
}

function draw() {
  // Run all the boids
  for (var i = 0; i < boids.length; i++) {
    boids[i].run(boids);
  }

  for (let i = 0; i < numTriangles; i++){
    let b = boidGroups[i]
    // console.log(b[0].position.x, b[0].position.y, b[1].position.x, b[1].position.y, b[2].position.x, b[2].position.y)
    // fill('rgba(255, 255, 255, 0.1)')
    // stroke(b[0].hue, 30, 90)
    if (random(100) < 20) {
      // curveTightness(10)
      strokeWeight(random(4))
      stroke(b[0].hue, 10, 230)
      // if(random(100) < 20) 
      // fill(0, 0, 0)
      noFill()
    	// triangle(b[0].position.x, b[0].position.y, b[1].position.x, b[1].position.y, b[2].position.x, b[2].position.y)
    	bezier(b[0].position.x, b[0].position.y, b[1].position.x, b[1].position.y, b[2].position.x, b[2].position.y, b[3].position.x, b[3].position.y)
    } 

    if (random(100) < 3) {
      blendMode(DODGE)
      stroke(100)
      
        let r = random(10)
        strokeWeight(random(6))
        ellipse(random(width), random(height), r, r)
      if (random(100) < 30) {
        strokeWeight(random(6))
        if (random(100) < 10) strokeWeight(randomGaussian(100, 10))
        line(0, random(height), width, random(height))
      }
      blendMode(MULTIPLY)
    }

  }

  if (drawCount++ > maxDrawing) noLoop()

  noFill()
	// stroke(random(100), 40, 10)
	let r = 5 + randomGaussian(0, 100)
    // stroke = random(40)
  	// if ( random(100) < 10 ) {
   //    c = floor(random(255))
   //    // stroke(`rgba(${c}, ${c}, ${c}, 0.1)`)
   //    alpha = Math.random() / 10
   //    stroke('rgba(255,255,255,' + alpha + ')')
   //    ellipse( random(width), random(height), r, r)
   //  }
   //  fill(100, 100, 100)
  	// for (let i = 0; i < 6; i++){
	  // 	point(random(width), random(height))
  	// }
}

// Boid class
// Methods for Separation, Cohesion, Alignment added
function Boid(x, y, id) {
  this.acceleration = createVector(0, 0);
  this.velocity = p5.Vector.random2D();
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.04; // Maximum steering force
  this.hue = 230 + random(20)
}


// Draw boid as a circle
Boid.prototype.render = function() {
  // fill(127, 127);
  // stroke(200);
  if(random(100) < 10) this.hue--
  // stroke(this.hue, 10, 110)
  // // let r = sin(frameCount / 100) * 40
  // r = 1
  // r = r
  // r = random(15)
  // stroke('rgba(255, 255, 255, 0.1)')
  // ellipse(this.position.x, this.position.y, r, r);

}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

// Forces go into acceleration
Boid.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  var sep = this.separate(boids); // Separation
  var ali = this.align(boids);    // Alignment
  var coh = this.cohesion(boids); // Cohesion
  // Arbitrarily weight these forces
  sep.mult(2.9);
  ali.mult(1.4);
  coh.mult(1.5);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  
  this.position.add(this.velocity);
  // Reset acceleration to 0 each cycle
  this.acceleration.mult(0.3);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force
  return steer;
}


// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r) this.position.x = width + this.r;
  if (this.position.y < -this.r) this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  var desiredseparation = 35.0;
  var steer = createVector(0, 0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  var neighbordist = 30;
  var sum = createVector(0, 0);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum); // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}
