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
