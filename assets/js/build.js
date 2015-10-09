(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var createjs = (typeof window !== "undefined" ? window['createjs'] : typeof global !== "undefined" ? global['createjs'] : null);
var stage = require('./stage');
var grid = require('./grid');
var preload = require('./preload');

var enemyRows = {
	min: 2,
	max: 4
};

var enemySpeed = {
	min: 3,
	max: 8
};

/**
	* Get a random integer from a range
	* @param  {Integer} min Range minimum (included)
	* @param  {Integer} max Range maximum (included)
	* @return {Integer}     Ranger integer between given range
	*/
function getRandomInt(min, max) {
	return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

var Enemy = function () {
	this.cc = new createjs.Container();
	this.cc.setBounds(0, 0, 101, 83);

	var enemyChar = new createjs.Bitmap(preload.getResult('char-enemy'));
	this.cc.addChild(enemyChar);
	this.reset();

	stage.addChild(this.cc);
};

Enemy.prototype.reset = function () {
	var randomStart = -getRandomInt(grid.xSize, grid.xSize*10);
	var randomRow = getRandomInt(enemyRows.min, enemyRows.max);
	var randomSpeed = getRandomInt(enemySpeed.min, enemySpeed.max);

	this.cc.x = randomStart;
	this.cc.y = grid.getY(randomRow);
	this.speed = randomSpeed;
};

Enemy.prototype.update = function () {
	if (this.cc.x < stage.canvas.width) {
		this.cc.x = this.cc.x + this.speed;
	} else {
		this.reset();
	}
};

module.exports = Enemy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./grid":4,"./preload":6,"./stage":7}],2:[function(require,module,exports){
(function (global){
var createjs = (typeof window !== "undefined" ? window['createjs'] : typeof global !== "undefined" ? global['createjs'] : null);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./enemy":1,"./grid":4,"./player":5,"./preload":6,"./stage":7}],3:[function(require,module,exports){
var engine = require('./engine');
engine.init();

},{"./engine":2}],4:[function(require,module,exports){
var grid = {
	xSize: 101,
	ySize: 83,
	yOffset: 25,
	getX: function (colNum) {
		return (colNum - 1) * this.xSize;
	},

	getY: function (rowNum) {
		return (rowNum - 1) * this.ySize - this.yOffset;
	}
};

module.exports = grid;

},{}],5:[function(require,module,exports){
(function (global){
var createjs = (typeof window !== "undefined" ? window['createjs'] : typeof global !== "undefined" ? global['createjs'] : null);
var preload = require('./preload');
var stage = require('./stage');
var grid = require('./grid');

var player = {};
player.gridX = 3;
player.gridY = 6;

player.cc = new createjs.Container();
player.cc.setBounds(0, 0, 101, 83);

player.init = function () {
	var playerChar = new createjs.Bitmap(preload.getResult('char-boy'));
	player.cc.addChild(playerChar);

	this.update();

	stage.addChild(player.cc);
};

player.handleInput = function (inputKey) {
	if (typeof inputKey === 'undefined') return;

	switch (inputKey) {
		case 'up':
			if (this.gridY - 1 > 0) {
				this.gridY--;
				this.update();
			}

			break;

		case 'right':
			if (this.gridX + 1 < 6) {
				this.gridX++;
				this.update();
			}

			break;

		case 'down':
			if (this.gridY + 1 < 7) {
				this.gridY++;
				this.update();
			}

			break;

		case 'left':
			if (this.gridX - 1 > 0) {
				this.gridX--;
				this.update();
			}
	}
};

player.reset = function () {
	this.gridX = 3;
	this.gridY = 6;
};

player.update = function () {
	player.cc.set({x: grid.getX(this.gridX), y: grid.getY(this.gridY)});
};

module.exports = player;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./grid":4,"./preload":6,"./stage":7}],6:[function(require,module,exports){
(function (global){
var createjs = (typeof window !== "undefined" ? window['createjs'] : typeof global !== "undefined" ? global['createjs'] : null);

var imageDir = 'assets/images';

var assets = [
	{src: imageDir + '/water-block.png', id: 'tile-water'},
	{src: imageDir + '/stone-block.png', id: 'tile-stone'},
	{src: imageDir + '/grass-block.png', id: 'tile-grass'},
	{src: imageDir + '/char-boy.png', id: 'char-boy'},
	{src: imageDir + '/enemy-bug.png', id: 'char-enemy'}
];

var queue = new createjs.LoadQueue();
queue.loadManifest(assets);
// queue.on('progress', handleProgress, this);
// queue.on('fileload', handleFileLoad, this);
// queue.on('complete', handleLoadComplete, this);

module.exports = queue;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
var createjs = (typeof window !== "undefined" ? window['createjs'] : typeof global !== "undefined" ? global['createjs'] : null);

var stage = new createjs.Stage('stage');

// Extend stage
stage.test = function () {
	return "Working!";
};

module.exports = stage;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[3]);
