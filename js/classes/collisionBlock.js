class CollisionBlock {
  constructor({ position }) {
    this.position = position
    this.width = 64
    this.height = 64
  }

  draw() {
    // Render hitbox
    c.fillStyle = 'rgba(255, 0, 0, 0.3)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}