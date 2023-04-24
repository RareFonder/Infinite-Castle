Array.prototype.parse2D = function () {
  const rows = []
  for (let i = 0; i < this.length; i += 16) {
    rows.push(this.slice(i, i + 16))
  }
  return rows
}

Array.prototype.createObjectsFrom2D = function () {
  const objects = []
  this.forEach((row, yIndex) => {
    row.forEach((symbol, xIndex) => {
      if (symbol === 292) {
        objects.push(new CollisionBlock({ 
          position: { x: xIndex * 64, y: yIndex * 64, } 
        }))
      }
    })  
  })
  return objects
}

