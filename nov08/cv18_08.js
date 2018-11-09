// vars


let plotW = 500,
	plotH = 500,
	amp = 20,
	count = 0.1, 
	inc = 0.1,
	strokeMax = 4,
	maxDrawings = 70 + Math.random() * 50, //+ Math.random() * 400,
	drawingIteration = 0,
	hue = 0,
	walkers = [],
	numWalkers = 3 + Math.ceil(Math.random() * 3)


chance = (pct) => {
	let result = false
	let rand = 100 * Math.random()
	if (pct < rand) result = true
	return result
}
// setup

setup = () => {
	createCanvas(plotW, plotH, WEBGL)
	background('#111')
	strokeWeight(0.25)
	// blendMode(DODGE)
	// 7d58a2
	hue = random(10)
	colorMode(HSB)
	stroke(hue, 0, 0)
	// var fov = 60 / 180 * PI;
	//   var cameraZ = height / 2.0 / tan(fov / 2.0);
	//   perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 10);

	// stroke('#A9469B')
	for (let i = 0; i < numWalkers; i++) {
		walkers.push(new Walker())
	}
	// filter(BLUR,10)
	
}

// draw

draw = () => {

	// orbitControl()
	// 	var dirX = (mouseX / width - 0.5) * 2;
	// 	var dirY = (mouseY / height - 0.5) * 2;
	// 	directionalLight(250, 250, 250, -dirX, -dirY, 0.25);
	// 	// specularMaterial(250);
	// 	ambientLight(100);
	// 	  pointLight(250, 250, 250, 100, 100, 0);
	if (drawingIteration++ > maxDrawings) return

	walkers.forEach(w => {
		w.walk()
		w.display()
	})
	
}

class Walker {
	constructor() {
		let range = width
		this.position = createVector(0, 0, 0)
		this.noff = createVector(random(1000), random(1000), random(1000))
		this.hue = 220 + random(10)
		this.rNoise = createVector(40 + random(100), random(1000))
		this.rz = random(1) / 80
		this.rx = random(1) / 50
		this.ry = random(1) / 100
	}

	display() {
		let r = this.rNoise.x
		// if (random(100) < 30) 
		this.hue -= 0.4
		// noStroke()
		push()
		fill(this.hue, 50, 150)
		// noFill()
		// ellipse(this.position.x, this.position.y, r, r)
		// translate(this.position.x, this.position.y, this.position.z)
		rotateZ(frameCount * this.rz);
		rotateX(frameCount * this.rx);
		rotateY(frameCount * this.ry);
		torus(r * 1.4, r/10)
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

