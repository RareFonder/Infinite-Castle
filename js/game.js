const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

// Creating collisions
const parsedCollisions = collisionsLevel1.parse2D()
const collisionBlocks = parsedCollisions.createObjectsFrom2D()

// Creating background 
const backgroundLevel1 = new Sprite({ 
  position: { x:0, y:0, }, 
  imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/backgroundLevel1.png',
})

// Creating player 
const player = new Player({ collisionBlocks })

const keys = { 
  w: {pressed: false}, 
  a: {pressed: false}, 
  d: {pressed: false},
}

// Drawing and updating the player, background and collisions
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