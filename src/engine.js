var createjs = require('createjs');
var stage = require('./stage');
var preload = require('./preload');
var grid = require('./grid');
var player = require('./player');
var Enemy = require('./enemy');

var maxLives = 3;

var engine = {
	loading: 0,
	lives: maxLives
};

var player, allEnemies;
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
var enemyNumber = 5;

engine.init = function () {
	// Preload assets
	preload.on('complete', run, this);
};

function run() {
	// Update on ticker
	createjs.Ticker.addEventListener('tick', update);

	// Handle user input
	document.addEventListener('keyup', handleInput);

	// Render game
	render();

	// Setup player
	player.init();

	// Setup enemies
	allEnemies = [];
	for (var x = 0; x < enemyNumber; x++) {
		allEnemies.push(new Enemy());
	}
}

function render() {
	/* This array holds the relative URL to the image used
	 * for that particular row of the game level.
	 */
	var rowImages = [
					'tile-water',   // Top row is water
					'tile-stone',   // Row 1 of 3 of stone
					'tile-stone',   // Row 2 of 3 of stone
					'tile-stone',   // Row 3 of 3 of stone
					'tile-grass',   // Row 1 of 2 of grass
					'tile-grass'    // Row 2 of 2 of grass
			],
			numRows = 6,
			numCols = 5,
			row, col;

	/* Loop through the number of rows and columns we've defined above
	 * and, using the rowImages array, draw the correct image for that
	 * portion of the "grid"
	 */
	for (row = 0; row < numRows; row++) {
			for (col = 0; col < numCols; col++) {
					/* The drawImage function of the canvas' context element
					 * requires 3 parameters: the image to draw, the x coordinate
					 * to start drawing and the y coordinate to start drawing.
					 * We're using our Resources helpers to refer to our images
					 * so that we get the benefits of caching these images, since
					 * we're using them over and over.
					 */
					// ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
					var bgTile = new createjs.Bitmap(preload.getResult(rowImages[row]));
					bgTile.set({x: col*grid.xSize, y: row*grid.ySize});
					stage.addChild(bgTile);
			}
	}

	// stage.update();
}

function update(event) {

	if (!event.paused) {
		updateEntities();
		stage.update();

		checkCollisions();
	}
}

function handleInput(event) {
	player.handleInput(allowedKeys[event.keyCode]);
}

function reset() {
	// TODO: Create reset functionality for game restart
}

function updateEntities() {
	// Update enemies
	allEnemies.forEach(function(enemy) {
			enemy.update();
	});

	// Update player
	player.update();
}

function handleProgress(event) {
	// handle preload event - progress
}

function handleFileLoad(event) {
	// handle preload event - fileload
}

function handleLoadComplete(event) {
	// handle preload event - completion
	// var completionEvent = new createjs.Event('preload-complete');
	// engine.dispatchEvent(event);

	run();
}

function checkCollisions() {
	if (player.gridY === 1) {
		player.reset();
		return;
	}

	allEnemies.forEach(function (enemy) {
		if (hasCollided(enemy.cc, player.cc)) {
			player.reset();
		}
	});
}

/**
	* Detects whether to Canvas objects have collided
	* @param  {Object}  object1 Contains following properties: x, y, width, height
	* @param  {Object}  object2 Same as above
	* @return {Boolean}         True when a collision has occured
	*/
function hasCollided(object1, object2) {
	var test1 = (object1.x < object2.x + object2._bounds.width);
	var test2 = (object1.x + object1._bounds.width > object2.x);
	var test3 = (object1.y < object2.y + object2._bounds.height);
	var test4 = (object1._bounds.height + object1.y > object2.y);

	if (test1 && test2 && test3 && test4) {
		return true;
	} else {
		return false;
	}
}

module.exports = engine;
