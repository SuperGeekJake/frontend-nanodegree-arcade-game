// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemyNumber = 5;
var allEnemies = [];

for (var x = 0; x < enemyNumber; x++) {
  allEnemies.push(new Enemy());
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  // Arrow and WASD keys
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'left',
    68: 'right',
    83: 'down',
    87: 'up'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
