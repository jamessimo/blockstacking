(function(){

function lvl4(io){
	//CANVAS VARS
	this.io = io;
	this.cHeight = io.canvas.height;
	this.cWidth = io.canvas.width;

	//GAME VARS
	this.goal =
	this.goalTouch =
	this.goalEffect = undefined;
	this.goalTime = 150;
	this.goalTouchTime = 0;
	this.gameWin =
	this.gameWinAnim =
	this.gameEnd = false;

}; iio.lvl4 = lvl4;

lvl4.prototype.setup = function(){


	levelBuilder.setup(this,'lvl4');

	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":8,"y":13},{"x":8,"y":15},{"x":4,"y":14.5},{"x":4,"y":13.5}],"numberEdges":4,"color":["#4285F4","#355BD8"],"pos":{"x":1.9139776192605495,"y":0}},{"vertexs":[{"x":10,"y":16},{"x":8,"y":16},{"x":8,"y":14},{"x":10,"y":14}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":-3.90156781533733,"y":0}},{"vertexs":[{"x":2,"y":16},{"x":1,"y":16},{"x":1,"y":13},{"x":2,"y":13}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":5.948243487626314,"y":0}}]
	);

}//SETUP

lvl4.prototype.step = function(){
	levelBuilder.step(this);
}//STEP

iio.AppManager.prototype.activatelvl4 = function(io){
	this.level = new iio.lvl4(io);
	return this.level;
}

})();
