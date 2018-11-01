// vars


let plotW = 500,
	plotH = 500,
	amp = 20,
	count = 0.1, 
	inc = 0.1,
	strokeMax = 4,
	maxDrawings = 200 + Math.random() * 400,
	drawingIteration = 0,
	hue = 0

step = (n, limit) => {
	count += inc
	plus = amp * Math.sin(count)
	let choice = Math.floor(Math.random() * 2)
	if (choice == 0) {
		n += plus
	} else if (choice == 1) {
		n -= plus
	} 
	if (n < 0) n = 0
	if (n > limit) n = limit
	return n
}

let points = [
	{x: Math.random() * plotW, y: Math.random() * plotH},
	{x: Math.random() * plotW, y: Math.random() * plotH}
]

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
}

// draw

draw = () => {

	if (drawingIteration++ > maxDrawings) return
	// ellipse(50, 80, 100, 100)
	points.forEach(p => {
		p.x = step(p.x, plotW)
		p.y = step(p.y, plotH)
	})

	let w = Math.random() * strokeMax
	if (Math.random() * 100 < 2) w *= 0.5 + strokeMax * 3
	strokeWeight(w)
	// stroke('rgba(125, 88, 162, 0.1')
	blendMode(DODGE)
	hue++
	stroke(hue, 40, 80)
	line(points[0].x, points[0].y, points[1].x, points[1].y)
	let r = Math.random() * amp / (2 + Math.random() * 3)
	ellipse(points[0].x, points[1].y, r, r)

	if ( (Math.random() * 100) < 20 ) {
		blendMode(MULTIPLY)
		r = Math.random() * 45
		// ellipse(Math.random() * plotW, Math.random() * plotH, r)
		ellipse(points[1].x, points[1].y, r)
	}
}

