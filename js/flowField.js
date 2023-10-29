let flowFieldCanva = document.getElementById('flowFieldCanvas')
let headerSize = document.querySelector('header').offsetHeight

window.addEventListener('resize', resizeWindow)

var canvaHeight = window.innerHeight - headerSize
var canvaWidth = window.innerWidth

class FlowField {
  constructor(canva) {
    this.canva = canva

    this.width = canva.width
    this.height = canva.height

    this.grid = []

    this.cellSize = 40

    let particleNumbers = 500

    this.curve = 0.1
    this.zoom = 1

    this.particles = []

    for (let i = 0; i < particleNumbers; i++)
      this.particles.push(new Particle(this))

    for (let y = 0; y < Math.ceil(this.height / this.cellSize); y++)
      for (let x = 0; x < Math.ceil(this.width / this.cellSize); x++)
        this.grid.push(
          (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve
        )
  }

  render(context) {
    this.particles.forEach(elem => {
      elem.update()
      elem.draw(context)
    })
  }
}

class Particle {
  constructor(field) {
    this.field = field

    this.x = Math.floor(Math.random() * field.width)
    this.y = Math.floor(Math.random() * field.height)

    this.angle = Math.random() * 2 * Math.PI

    this.xSpeed
    this.ySpeed

    this.speedModifier = Math.random()

    this.size = Math.floor((Math.random() * canvaWidth) / 4 + 10)

    this.history = [{ x: this.x, y: this.y }]

    this.timer = this.size * 2
  }

  update() {
    this.timer--

    if (this.timer >= 1) {
      let y = Math.floor(this.y / this.field.cellSize)
      let x = Math.floor(this.x / this.field.cellSize)
      let index = x * Math.floor(this.field.height / this.field.cellSize) + y
      this.angle = this.field.grid[index]

      this.xSpeed = Math.cos(this.angle)
      this.ySpeed = Math.sin(this.angle)

      this.x += this.xSpeed * this.speedModifier
      this.y += this.ySpeed * this.speedModifier

      this.history.push({ x: this.x, y: this.y })

      if (this.history.length > this.size) this.history.shift()
    } else if (this.history.length > 1) {
      this.history.shift()
    } else {
      this.reset()
    }
  }

  draw(context) {
    context.beginPath()
    context.moveTo(this.history[0].x, this.history[0].y)
    for (let i = 0; i < this.history.length; i++) {
      context.lineTo(this.history[i].x, this.history[i].y)
    }
    context.stroke()
  }

  reset() {
    this.x = Math.floor(Math.random() * field.width)
    this.y = Math.floor(Math.random() * field.height)

    this.history = [{ x: this.x, y: this.y }]

    this.timer = this.size * 2
  }
}

let field = new FlowField(flowFieldCanva)
const ctx = flowFieldCanva.getContext('2d')

function resizeWindow() {
  canvaHeight = window.innerHeight - headerSize
  flowFieldCanva.height = canvaHeight

  canvaWidth = document.body.clientWidth
  flowFieldCanva.width = canvaWidth

  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 1

  field = new FlowField(flowFieldCanva)

  animate()
}
resizeWindow()

function animate() {
  ctx.clearRect(0, 0, flowFieldCanva.width, flowFieldCanva.height)
  field.render(ctx)
  requestAnimationFrame(animate)
}
