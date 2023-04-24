const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

const player = new Player()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  player.draw()
  player.update()
}

animate()

window.addEventListener('keydown', (event) => {
  console.log(event)
  switch (event.key) {
    case 'w':
      player.velocity.y = -10
      break
  }
})