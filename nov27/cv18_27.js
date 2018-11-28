
let 
  drawLimit = 100,
  numDrops = 50
  drops = [],
  drawLimit = 150


function setup() {
 
  createCanvas(500, 500);
  colorMode(HSB, 100)
  background('#222')
  // background('#fff')
  // blendMode(DODGE)
  // blendMode(MULTIPLY)


  for (let i = 0; i < numDrops; i++) {

    let x = randomGaussian(width/2, 100),
      y = randomGaussian(height/2, 100),
      hue = random(20, 40),
      bright = random(60, 80)
      numSplats = random(4, 50),
      splats = [],
      vxr = 12,
      vyr = 5


      for (let j = 0; j < numSplats; j++) {
        splats.push({
          x: x,
          y: y,
          r: random(1, 6),
          vx: random(-vxr, vxr), 
          vy: random(-vyr, vyr),
          hue: hue,
          life: ceil(random(10, 50))
        })
      }

    drops.push({
      id: i,
      x: x,
      y: y,
      r: random(2, 8),
      hue: hue,
      bright: bright,
      splats: splats
    })

    // initial drop
    let r = random(5, 30)
    noStroke()
    fill(hue, 40, bright)
    ellipse(x, y, r, r)
  }

}


function draw() {

  drops.forEach(d => {

    d.bright -= 0.5
    fill(d.hue, 40, d.bright)
    let friction = random(0.7, 0.9)

    d.splats.forEach(s => {
      if (s.life-- <= 0) return
      ellipse(s.x, s.y, s.r, s.r)
      s.r -= random(0.05, 0.3)
      s.x += s.vx 
      s.y += s.vy
      s.vx *= friction
      s.vy *= friction
      s.vy += 0.2
    })

  })


  if (frameCount > drawLimit) noLoop()
}

