// vars


let plotW = 500,
	plotH = 500,
	amp = 20,
	count = 0.1, 
	inc = 0.1,
	strokeMax = 4,
	maxDrawings = 200 + Math.random() * 400,
	drawingIteration = 0,
	hue = 0,
	walkers = [],
	numWalkers = 1 + Math.ceil(Math.random() * 8)


chance = (pct) => {
	let result = false
	let rand = 100 * Math.random()
	if (pct < rand) result = true
	return result
}
// setup

setup = () => {
	createCanvas(plotW, plotH)
	background('#444')
	strokeWeight(0.5)
	blendMode(DODGE)
	// 7d58a2
	hue = Math.random() * 255
	colorMode(HSB)
	stroke(hue, 40, 80)
	// stroke('#A9469B')
	for (let i = 0; i < numWalkers; i++) {
		walkers.push(new Walker())
	}
	filter(BLUR,10)
}

// draw

draw = () => {

	if (drawingIteration++ > maxDrawings) return
	walkers.forEach(w => {
		w.walk()
		w.display()
	})
	

	// r = random(30)
	r = 1
	// stroke(0, 0, 0)
	ellipse(random(width), random(height), r, r)
}

class Walker {
	constructor() {
		this.position = createVector(width / 2, height / 2)
		this.noff = createVector(random(1000), random(1000))
		this.hue = Math.floor(Math.random() * 255)
		this.rNoise = createVector(random(80), random(1000))
	}

	display() {
		let r = this.rNoise.x
		this.hue++
		noFill()
		stroke(this.hue, 40, 80)
		ellipse(this.position.x, this.position.y, r, r)
	}

	walk () {
		this.position.x = map(noise(this.noff.x), 0, 1, 0, width)
		this.position.y = map(noise(this.noff.y), 0, 1, 0, height)
		this.noff.add(0.01, 0.01, 0);
		this.rNoise.add(0.01, 0.1, 0)
	}
}

