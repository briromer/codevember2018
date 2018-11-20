
let numDots = 800,
  dots = [],
  drawLimit = 200,
  drawCount = 0


function setup() {
 
  createCanvas(500, 500, WEBGL);
  colorMode(HSB, 100)
  background('#222')
  // blendMode(DODGE)
  // blendMode(MULTIPLY)

  // camera(-width / 2, width / 2, -height / 2);
  // camera (0, 0, 100)
  var fov = 60 / 180 * PI;
   var cameraZ = height / 2.0 / tan(fov / 2.0);
   perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 100);

   for(let i = 0; i < numDots; i++) {
      dots.push({
        id: i,
        x: random(width), 
        y: random(height),
        z: random(100),
        vx: random(1) / 100,
        vy: random(2) / 10, 
        vz: random(2) / 100
        ,
        r: 5 + random(5)
        ,hue: 50 + random(10)
        ,hueInc: random(3)
      })
   }

}

function draw() {
  
  
  orbitControl()
  ambientLight(200);
  pointLight(250, 250, 250, 100, 100, 0);
  
  for (let i = 0; i < dots.length; i++) {
    let d = dots[i]
    push()
    // fill(d.col)
    // console.log(d.r)
    noStroke()
    // stroke(255, 255 ,255)
    // fill(d.hue, 90, 60)
    ambientMaterial(d.hue, 90, 60);
    translate(d.x  - width/2 , d.y - height/2, d.z)
    rotateY(1)
    rotateZ(2)
    d.r += 0.1
    box(d.r)
    pop()
    d.x += d.vx + sin((frameCount/10) * d.vx)
    d.y += d.vy + cos((frameCount/5) * d.vy)
    d.z += d.vz + sin((frameCount/3) * d.vz)
    d.hue += d.hueInc/50
    // if (d.hue > 100) d.hue = 20
  }
 

  if (drawCount++ > drawLimit) noLoop()
}

