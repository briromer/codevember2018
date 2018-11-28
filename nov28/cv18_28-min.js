
let 
  numDrops = 70
  drops = [],
  drawLimit = 100


function setup() {
 
  createCanvas(500, 500) //, WEBGL);
  colorMode(HSB, 100)
  background('#222')
  // background('#fff')
  blendMode(DODGE)
  // blendMode(MULTIPLY)


  for (let i = 0; i < numDrops; i++) {


    let x = randomGaussian(width/2, 100),
      // y = randomGaussian(height),
      y = random(height)
      z = random(100)
      hue = random((y/height) * 50, ((y/height) * 50) + 20),
      bright = random(60, 80)
      numSplats = random(4, 50),
      splats = [],
      vxr = 5,
      vyr = 8
      vyz = 4


      for (let j = 0; j < numSplats; j++) {
        splats.push({
          x: x,
          y: y,
          z: z,
          r: random(0.7, 3),
          vx: random(-vxr, vxr), 
          vy: random(-vyr, vyr),
          vz: random(-vyz, vyz),
          xGrav: random(-1, 1),
          yGrav: random(-1, 1),
          zGrav: random(-1, 1),
          hue: hue,
          life: ceil(random(50, 150))
        })
      }

    drops.push({
      id: i,
      x: x,
      y: y,
      z: z,
      r: random(0.1, 0.2),
      hue: hue,
      bright: bright,
      splats: splats
    })

    // initial drop
    let r = random(5, 30)
    noFill()
    stroke(hue, 40, bright)
    // rect(x, y, r, r)
  }

}


function draw() {

  // orbitControl()
  blendMode(DODGE)
  drops.forEach(d => {

    d.bright -= 0.1
    d.hue += 0.2
    noStroke()
    fill(d.hue, 40, d.bright)
    let friction = random(0.9, 0.95)

    d.splats.forEach(s => {
      if (s.life-- <= 0) return
      // box(s.x, s.y, s.z, s.r)//, s.r)
      rect(s.x, s.y, s.r, s.r)
      s.r -= random(0.1, 0.2)
      if (s.r < 0.5) s.r = 0.5
      s.x += s.vx 
      s.y += s.vy
      s.z += s.vzy
      s.vx *= friction
      s.vy *= friction
      s.vz *= friction
      s.x += sin(frameCount/40) * s.xGrav
      s.y += cos(frameCount/30) * s.yGrav
      s.z += s.zGrav
      s.xGrav *= 1.01

    })

    if (random() < 0.01) {
      let r = random(4, 40)
      stroke('#666')
      strokeWeight(random(2))
      noFill()
      blendMode(MULTIPLY)
      ellipse(randomGaussian(width/2, 50), randomGaussian(height/2, 50), r, r)
      
    }

  })


  if (frameCount > drawLimit) noLoop()
}

