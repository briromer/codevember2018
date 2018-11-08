// vars


let plotW = 500,
	plotH = 500,
	amp = 20,
	count = 0.1, 
	inc = 0.1,
	strokeMax = 4,
	maxDrawings = 50, //+ Math.random() * 400,
	drawingIteration = 0,
	hue = 0,
	walkers = [],
	numWalkers = 1 + Math.ceil(Math.random() * 3)


chance = (pct) => {
	let result = false
	let rand = 100 * Math.random()
	if (pct < rand) result = true
	return result
}
// setup

setup = () => {
	createCanvas(plotW, plotH, WEBGL)
	background('#444')
	strokeWeight(0.5)
	// blendMode(DODGE)
	// 7d58a2
	hue = Math.random() * 100
	colorMode(HSB)
	stroke(hue, 40, 80)
	var fov = 60 / 180 * PI;
	  var cameraZ = height / 2.0 / tan(fov / 2.0);
	  perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 10);

	// stroke('#A9469B')
	for (let i = 0; i < numWalkers; i++) {
		walkers.push(new Walker())
	}
	// filter(BLUR,10)
}

// draw

draw = () => {

	if (drawingIteration++ > maxDrawings) noLoop()
		
		orbitControl()
	var dirX = (mouseX / width - 0.5) * 2;
	  var dirY = (mouseY / height - 0.5) * 2;
	  directionalLight(250, 250, 250, -dirX, -dirY, 0.25);
	specularMaterial(250);

	walkers.forEach(w => {
		w.walk()
		w.display()
	})
	
	// sphere(40)

	// r = random(30)
	r = 1
	// stroke(0, 0, 0)
	// ellipse(random(width), random(height), r, r)
}

class Walker {
	constructor() {
		let range = width
		this.position = createVector(0, 0, 0)
		this.noff = createVector(random(1000), random(1000), random(1000))
		this.hue = Math.floor(Math.random() * 100)
		this.rNoise = createVector(50 + random(180), random(1000))
	}

	display() {
		let r = this.rNoise.x
		// if (random(100) < 30) 
		this.hue += 0.3
		// noStroke()
		push()
		stroke(this.hue, 50, 80)
		noFill()
		// ellipse(this.position.x, this.position.y, r, r)
		// translate(this.position.x, this.position.y, this.position.z)
		rotateZ(frameCount * 0.05);
		rotateX(frameCount * 0.05);
		rotateY(frameCount * 0.05);
		box(r)
		pop()
	}

	walk () {
		this.position.x = map(noise(this.noff.x), 0, 1, 0, width)
		this.position.y = map(noise(this.noff.y), 0, 1, 0, height)
		this.position.z = map(noise(this.noff.z), 0, 1, 0, width)
		this.noff.add(0.01, 0.01, 0);
		this.rNoise.add(0.01, 0.1, 0)
	}
}

