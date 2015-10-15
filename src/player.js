var createjs = require('createjs');
var preload = require('./preload');
var stage = require('./stage');
var grid = require('./grid');

var player = {};
player.cc = new createjs.Container();
player.cc.setBounds(0, 0, 101, 83);

player.init = function () {
	var playerChar = new createjs.Bitmap(preload.getResult('char-boy'));
	player.cc.addChild(playerChar);

	this.reset();

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

	this.update();
};

player.update = function () {
	player.cc.set({x: grid.getX(this.gridX), y: grid.getY(this.gridY)});
};

module.exports = player;
