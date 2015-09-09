// globals window, ctx, grid, Math

(function () {
	var canvasWidth = 505;
	var enemyWidth = 101; // width of enemy-bug.png
	var startOffsetMax = enemyWidth * 10;
	var enemyRows = {
		min: 2,
		max: 4
	};
	var enemySpeed = {
		min: 75,
		max: 200
	};

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * ((max + 1) - min)) + min;
	}

	// Enemies our player must avoid
	var Enemy = function() {
		this.sprite = 'images/enemy-bug.png';
		this.reset();
	};

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	Enemy.prototype.update = function(dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		if (this.x < canvasWidth) {
			this.x = this.x + (this.speed * dt);
		} else {
			this.reset();
		}
	};

	Enemy.prototype.reset = function () {
		var randomStart = -getRandomInt(enemyWidth, startOffsetMax);
		var randomRow = getRandomInt(enemyRows.min, enemyRows.max);
		var randomSpeed = getRandomInt(enemySpeed.min, enemySpeed.max);

		this.x = randomStart;
		this.y = grid.getY(randomRow);
		this.speed = randomSpeed;
	};

	// Draw the enemy on the screen, required method for game
	Enemy.prototype.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};

	window.Enemy = Enemy;
})();
