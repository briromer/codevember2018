
let 
  numDrops = 130
  drops = [],
  drawLimit = 500


function setup() {
 
  createCanvas(500, 500) //, WEBGL);
  colorMode(HSB, 100)
  background('#222')
  // background('#fff')
  blendMode(DODGE)
  // blendMode(MULTIPLY)


  for (let i = 0; i < numDrops; i++) {


    let centerx = randomGaussian(width/2, 100),
      // y = randomGaussian(height),
      centery = random(height),
      innerRadius = random(5),
      gap = random(1, 10),
      life = random(300, 800)
      hue = random((centery/height) * 50, ((centery/height) * 50) + 20),
      // bright = random(60, 80)
      // bright = random((centerx / width) * 50, (centerx / width) * 50 + 30)
      bright = (centerx / width) * 50

    drops.push({
      id: i,
      centerx: centerx,
      centery: centery,
      innerRadius: innerRadius, 
      gap: gap,
      life: life,
      hue: hue,
      bright: bright,
      lastX: centerx,
      lastY: centery
    })

  }

}


function draw() {

  // orbitControl()
  // blendMode(DODGE)
  drops.forEach(d => {

    if (frameCount > d.life) return
    d.bright -= 0.1
    d.hue += 0.2
    stroke(d.hue, 40, d.bright)
    strokeWeight(0.7)

    let angle = 0.1 * frameCount;
    d.x = d.centerx + (d.innerRadius + d.gap * angle) * cos(angle);
    d.y = d.centery + (d.innerRadius + d.gap  * angle) * sin(angle);

    line(d.lastX, d.lastY, d.x, d.y)

    let friction = random(0.9, 0.95)

    // d.splats.forEach(s => {
    //   if (s.life-- <= 0) return
    //   // box(s.x, s.y, s.z, s.r)//, s.r)
    //   rect(s.x, s.y, s.r, s.r)
    //   s.r -= random(0.1, 0.2)
    //   if (s.r < 0.5) s.r = 0.5
    //   s.x += s.vx 
    //   s.y += s.vy
    //   s.z += s.vzy
    //   s.vx *= friction
    //   s.vy *= friction
    //   s.x += sin(frameCount/40) * s.xGrav
    //   s.y += cos(frameCount/30) * s.yGrav
    //   s.z += s.zGrav
    //   s.xGrav *= 1.01

    // })

    if (random() < 0.01) {
      let r = random(4, 40)
      if (random() < 0.1) r = random(50, 100)
      stroke('#666')
      strokeWeight(0.4)
      noFill()
      // blendMode(MULTIPLY)
      ellipse(randomGaussian(width/2, 50), randomGaussian(height/2, 50), r, r)
      
    }

  })


  if (frameCount > drawLimit) noLoop()
}

