class Player {
  constructor({ collisionBlocks = [] }) {
    this.position = { x: 100, y: 100, }
    this.velocity = { x: 0, y: 0, }
    this.width = 100
    this.height = 100
    this.sides = {
      bottom: this.position.y + this.height
    }
    this.gravity = 1
    this.collisionBlocks = collisionBlocks
  }
  
  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.position.x += this.velocity.x

    // Horizontal collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      // Checking if collision exists
      if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {

        // Collision on the left of player
        if (this.velocity.x < -1) {
          this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
          break
        }
        // On the right of player
        if (this.velocity.x > 1) {
          this.position.x = collisionBlock.position.x - this.width - 0.01
          break
        } 
      }
    }

    this.position.y += this.velocity.y
    this.sides.bottom = this.position.y + this.height 

    // Check if player is touching bottom of canvas
    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += this.gravity
    } else this.velocity.y = 0
  }
}