
let 
  drawLimit = 100,
  numThreads = 400
  threads = []


function setup() {
 
  createCanvas(500, 500);
  colorMode(HSB, 100)
  background('#222')
  // background('#fff')
  // blendMode(DODGE)
  // blendMode(MULTIPLY)

  // hue = 20
  // fill(hue, 30, 40)


  for (let i = 0; i < numThreads; i++) {
    let up = random() > 0.5 ? 1 : -1
    let startY = up == 1 ? 0 : height
    let r = random(10, 20)
    // if (random() > 0.97) r = random(30, 50)
    threads.push({
      x: random(width),
      y: startY,
      vx: random(-6, 6),
      vy: up * random(5, 9),
      hue: random(0, 20),
      r: r,
      xFriction: random(0.85, 0.9),
      yFriction: random(0.9, 0.97)
    })
  }

}

function draw() {

  threads.forEach(t => {
    noStroke()
    fill(t.hue, 50, 90)
    ellipse(t.x, t.y, t.r, t.r)
    t.hue -= random(0.1, 0.4)
    t.r -= random(0.1, 0.2)
    t.x += t.vx
    t.y += t.vy
    t.vx *= t.xFriction
    t.vy *= t.yFriction
  })


  if (frameCount > drawLimit) noLoop()
}

