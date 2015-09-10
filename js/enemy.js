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

	/**
	 * Get a random integer from a range
	 * @param  {Integer} min Range minimum (included)
	 * @param  {Integer} max Range maximum (included)
	 * @return {Integer}     Ranger integer between given range
	 */
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * ((max + 1) - min)) + min;
	}

	/**
	 * Detects whether to Canvas objects have collided
	 * @param  {Object}  object1 Contains following properties: x, y, width, height
	 * @param  {Object}  object2 Same as above
	 * @return {Boolean}         True when a collision has occured
	 */
	function hasCollided(object1, object2) {
		var test1 = (object1.x < object2.x + object2.width);
		var test2 = (object1.x + object1.width > object2.x);
		var test3 = (object1.y < object2.y + object2.height);
		var test4 = (object1.height + object1.y > object2.y);

		if (test1 && test2 && test3 && test4) {
			return true;
		} else {
			return false;
		}
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
