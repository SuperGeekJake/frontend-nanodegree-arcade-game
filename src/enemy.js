var createjs = require('createjs');
var stage = require('./stage');
var grid = require('./grid');
var preload = require('./preload');

var enemyRows = {
	min: 2,
	max: 4
};

// Pixels per second
var enemySpeed = {
	min: 100,
	max: 150
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

Enemy.prototype.update = function (event) {
	if (this.cc.x < stage.canvas.width) {
		this.cc.x += event.delta / 1000 * this.speed;
	} else {
		this.reset();
	}
};

module.exports = Enemy;
