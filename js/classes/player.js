class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc }) {
    super({ imageSrc })
    this.position = { x: 200, y: 200, }
    this.velocity = { x: 0, y: 0, }
    this.width = 25
    this.height = 25
    this.sides = {
      bottom: this.position.y + this.height
    }
    this.gravity = 1
    this.collisionBlocks = collisionBlocks
  }

  update() {
    this.position.x += this.velocity.x

    this.checkForHorizontalCollisions()
    this.applyGravity()
    this.checkForVerticalCollisions()
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]
      // Checking if collision exists
      if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // Left of player
        if (this.velocity.x < 0) {
          this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
          break
        }
        // Right of player
        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.01
          break
        } 
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]
      // Checking if collision exists
      if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // Top of player
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
          break
        }
        // Bottom of player 
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y - this.height - 0.01
          break
        } 
      }
    }
  }
}