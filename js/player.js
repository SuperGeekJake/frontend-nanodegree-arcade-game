// globals window, ctx, grid, collision

(function () {
	var Player = function () {
	  this.sprite = 'images/char-boy.png';
		this.setStart();
	};

	Player.prototype.update = function () {
		this.render();
	};

	Player.prototype.setStart = function () {
		this.gridX = 3;
	  this.gridY = 6;
	};

	Player.prototype.render = function () {
	  ctx.drawImage(Resources.get(this.sprite), grid.getX(this.gridX), grid.getY(this.gridY));

		// TODO: run collision test
	};

	Player.prototype.handleInput = function (inputKey) {
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

	window.Player = Player;
})();
