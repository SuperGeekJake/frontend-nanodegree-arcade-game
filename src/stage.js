var createjs = require('createjs');

var stage = new createjs.Stage('stage');

// Extend stage
stage.test = function () {
	return "Working!";
};

module.exports = stage;
