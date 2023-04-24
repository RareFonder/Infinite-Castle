const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576

let parsedCollisions 
let collisionBlocks 
let background
let doors = [
  new Sprite({
    position: { x: 767, y: 271, },
    imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/doorOpen.png',
    frameRate: 5,
    frameBuffer: 5,
    loop: false,
    autoplay: false,
  })
]
const player = new Player({ 
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
      imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/enterDoor.png',
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++
            if (level === 4) level = 1
            levels[level].init()
            player.switchSprite('idleRight')

            setTimeout(() => {
              player.preventInput = false
              gsap.to(overlay, {
                opacity: 0
              })
            }, 1000)
          }
        })
      }
    },
  },
})

let level = 1
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({ 
        position: { x: 0, y: 0, }, 
        imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/backgroundLevel1.png',
      })

      doors = [
        new Sprite({
          position: { x: 767, y: 271, },
          imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 96
      player.position.y = 140
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({ 
        position: { x: 0, y: 0, }, 
        imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/backgroundLevel2.png',
      })

      doors = [
        new Sprite({
          position: { x: 772, y: 335, },
          imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        })
      ]
    }
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 750
      player.position.y = 230
      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({ 
        position: { x: 0, y: 0, }, 
        imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/backgroundLevel3.png',
      })

      doors = [
        new Sprite({
          position: { x: 176, y: 335, },
          imageSrc: 'https://stackblitz.com/files/web-platform-aygtwk/github/RareFonder/Kings-and-Pigs/main/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
}

const keys = { 
  w: {pressed: false}, 
  a: {pressed: false}, 
  d: {pressed: false},
}

const overlay = {
  opacity: 0,
}

// Drawing, updating and animating the player, background and collisions
function animate() {
  window.requestAnimationFrame(animate)

  background.draw()

  // Render doors
  doors.forEach((door) => {
    door.draw()
  })  

  player.handleInput(keys)
  player.draw()
  player.update()

  c.save()
  c.globalAlpha = overlay.opacity
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.restore()
}

levels[level].init()
animate()