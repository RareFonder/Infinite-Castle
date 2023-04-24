const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position
    this.image = new Image()
    this.image.onload = () => { this.loaded = true }
    this.image.src = imageSrc
    this.loaded = false
  }  
  draw() {
    if (!this.loaded) return
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

const backgroundLevel1 = new Sprite({ 
  position: { x:0, y:0, }, 
  imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/backgroundLevel1.png',
})

const player = new Player()

const keys = { 
  w: {pressed: false}, 
  a: {pressed: false}, 
  d: {pressed: false},
}
function animate() {
  window.requestAnimationFrame(animate)

  backgroundLevel1.draw()

  player.velocity.x = 0
  if (keys.d.pressed) player.velocity.x = 5
  else if (keys.a.pressed) player.velocity.x = -5

  player.draw()
  player.update()
}

animate()