/*
Tasks:
- Build canvas
-
 */
var $ = require('jquery');
var createjs = require('createjs');
var stage = require('./stage');
// var player = require('player');
// var enemy = require('enemy');

var engine = {};
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
var assets = [
	'images/water-block.png',
	'images/stone-block.png',
	'images/grass-block.png'
];

engine.init = function () {
	// Preload assets
	var queue = new createjs.LoadQueue();
	queue.on('complete', run);
	queue.loadManifest(assets);

	queue.load();
};

function run() {
	// Complete reset
	// reset();

	// Setup player
	// player = new Player();

	// Setup enemies
	// allEnemies = [];
	// for (var x = 0; x < enemyNumber; x++) {
	// 	allEnemies.push(new Enemy());
	// }

	// Update on ticker
	// createjs.Ticker.addEventListener('ticker', update);

	// Handle user input
	// document.addEventListener('keyup', handleInput);

	// Render game
	render();
}

function render() {
	/* This array holds the relative URL to the image used
	 * for that particular row of the game level.
	 */
	var rowImages = [
					'images/water-block.png',   // Top row is water
					'images/stone-block.png',   // Row 1 of 3 of stone
					'images/stone-block.png',   // Row 2 of 3 of stone
					'images/stone-block.png',   // Row 3 of 3 of stone
					'images/grass-block.png',   // Row 1 of 2 of grass
					'images/grass-block.png'    // Row 2 of 2 of grass
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
					var bgTile = new createjs.Bitmap(rowImages[row]);
					bgTile.set({x: col*101, y: row*83});
					stage.addChild(bgTile);
					console.log('Tile added')
			}
	}

	stage.update();
}

function update(event) {
	updateEntities();
	// checkCollisions();
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
			enemy.update(dt);
	});

	// Update player
	player.update();

	// Update stage
	stage.update();
}

module.exports = engine;
