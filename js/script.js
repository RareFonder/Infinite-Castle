const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

const collisionBlocks = []

const parsedCollisions = collisionsLevel1.parse2D()
parsedCollisions.forEach((row, yIndex) => {
  row.forEach((symbol, xIndex) => {
    if (symbol === 292) {
      collisionBlocks.push(new CollisionBlock({ 
        position: { x: xIndex * 64, y: yIndex * 64, } 
      }))
    }
  })  
})

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
  collisionBlocks.forEach(collisionBlock => {
    collisionBlock.draw()
  })

  player.velocity.x = 0
  if (keys.d.pressed) player.velocity.x = 5
  else if (keys.a.pressed) player.velocity.x = -5

  player.draw()
  player.update()
}

animate()