// globals window

(function () {
	var xSize = 101;
	var ySize = 83;

	var yOffset = 25;

	var grid = {
		getX: function (colNum) {
			return (colNum - 1) * xSize;
		},
		getY: function (rowNum) {
			return (rowNum - 1) * ySize - yOffset;
		}
	};

	window.grid = grid;
})();
