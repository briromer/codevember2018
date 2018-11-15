
let x, y,
  drawCount,
  numSteps, xStepRange,
  yStepRange,
  hue

function setup() {
  drawCount = 0
  x = 0
  y = height
  numSteps = 400 + random(300)
  xStepRange = 5
  yStepRange = 1
  hue = 70 + random(30)

  createCanvas(500, 500);
  colorMode(HSB, 100)
  background('#fff')
  blendMode(MULTIPLY)

  noStroke()
}

function draw() {
  fill(hue, 40, 90)
  radiusRange = 2 + random(20)

  function drawAroundPoint(px, py) {
    let iterations = 20 + random(60)
    let range = 10 + random(40)
    if (random(100) < 10) {
      iterations += random(80)
      range += random(50)
    }
    for (let i = 0; i < iterations; i++) {
      let thisx = px + (random(range) - range/2),
        thisy = py + (random(range) - range/2),
        r = random(3)
        if (random(100) < 1) r = random(10)
        ellipse(thisx, thisy, r, r)
    }
  }

  // right
  // let r = random(radiusRange)
  // ellipse(width/2 + x, y, r, r)
  // ellipse(width / 2 + x + random(20), y, 2, 2)
  drawAroundPoint(width/2 + x, y)

  // left
  // r = random(radiusRange)
  // ellipse(width / 2 - x, y, r, r)
  // ellipse(width / 2 - x - random(20), y, 2, 2)
  drawAroundPoint(width/2 - x, y)

  // step
  x += 4 + random(xStepRange)
  y += random(yStepRange)
  hue -= 0.1


  xStepRange -= sin(frameCount / 10)

  yStepRange += cos(frameCount / 12)

  if (drawCount++ > numSteps) noLoop()

}

