var createjs = require('createjs');

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

module.exports = queue;
