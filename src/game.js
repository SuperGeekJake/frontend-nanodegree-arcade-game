var engine = require('./engine');

function resizeStage() {
	var gameArea = document.getElementById('stageArea');
	var widthToHeight = 505 / 606;
	var newWidth = window.innerWidth;
	var newHeight = window.innerHeight;
	var newWidthToHeight = newWidth / newHeight;

	if (newWidthToHeight > widthToHeight) {
		newWidth = newHeight * widthToHeight;
		gameArea.style.height = newHeight + 'px';
		gameArea.style.width = newWidth + 'px';
	} else {
		newHeight = newWidth / widthToHeight;
		gameArea.style.width = newWidth + 'px';
		gameArea.style.height = newHeight + 'px';
	}

	gameArea.style.marginTop = (-newHeight / 2) + 'px';
	gameArea.style.marginLeft = (-newWidth / 2) + 'px';
}

resizeStage();
window.addEventListener('resize', resizeStage, false);
window.addEventListener('orientationchange', resizeStage, false);

engine.init();
