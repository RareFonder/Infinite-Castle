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
const player = new Player({ 
  collisionBlocks, 
  imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/idle.png',
  frameRate: 11,
  animations: {
    idleRight: { 
      frameRate: 11, 
      frameBuffer: 4, 
      loop: true, 
      imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/idle.png',
    },
    idleLeft: { 
      frameRate: 11, 
      frameBuffer: 4, 
      loop: true, 
      imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/idleLeft.png',
    },
    runRight: { 
      frameRate: 8, 
      frameBuffer: 4,
      loop: true, 
      imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/runRight.png',
    },
    runLeft: { 
      frameRate: 8, 
      frameBuffer: 4, 
      loop: true, 
      imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/runLeft.png',
    },
    enterDoor: { 
      frameRate: 8, 
      frameBuffer: 4, 
      loop: false, 
      imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/runLeft.png',
    },
  },
})

const doors = [
  new Sprite({
    position: { x: 767, y: 271, },
    imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/doorOpen.png',
    frameRate: 5,
    frameBuffer: 5,
    loop: false,
    autoplay: false,
  })
]

const keys = { 
  w: {pressed: false}, 
  a: {pressed: false}, 
  d: {pressed: false},
}

// Drawing, updating and animating the player, background and collisions
function animate() {
  window.requestAnimationFrame(animate)

  backgroundLevel1.draw()
  // Render collision blocks (Not needed for now)
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.draw()
  // })

  // Render doors
  doors.forEach((door) => {
    door.draw()
  })  

  player.handleInput(keys)
  player.draw()
  player.update()
}

animate()