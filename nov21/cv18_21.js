
let numDots = 500,
  dots = [],
  drawLimit = 100,
  drawCount = 0


function setup() {
 
  createCanvas(500, 500);
  colorMode(HSB, 100)
  background('#222')
  blendMode(DODGE)
  // blendMode(MULTIPLY)


   for(let i = 0; i < numDots; i++) {
     
      let up = random() > 0.5 ? 1 : -1
      let b = (random(100) < 10) ? 0 : 10
      dots.push({
        id: i,
        x: random(width), 
        y: height / 2 - (up * 5),
        vx: random(8) - 4,
        vy: up * (random(10) - 1), 
        r: 10 + random(10),
        hue: 60 + random(10),
        hueInc: random(),
        sat: 50 + random(20),
        bright: b + random(20)
      })
   }

}

function draw() {
  
  
  for (let i = 0; i < dots.length; i++) {
    let d = dots[i]
    noStroke()
    fill(d.hue, d.sat, d.bright)
    ellipse(d.x, d.y, d.r, d.r)
    
    d.r -= random() * 0.5
    d.x += 4 + sin((frameCount/10)) * d.vx
    d.y += d.vy + cos((frameCount/5)) * d.vy
    d.hue -= d.hueInc/10
    d.sat -= 1
    d.bright += 1
    // if (d.hue > 100) d.hue = 20
  }

 

  if (drawCount++ > drawLimit) noLoop()
}

