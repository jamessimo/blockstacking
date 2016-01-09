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
		[{"vertexs":[{"x":10,"y":13},{"x":10,"y":16},{"x":7,"y":15},{"x":7,"y":14}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":1.2300810106098652,"y":0}},{"vertexs":[{"x":7,"y":13},{"x":7,"y":14},{"x":5,"y":14},{"x":5,"y":13}],"numberEdges":4,"color":["#CDDC39","#B9C246"],"pos":{"x":-1.630421911366284,"y":0}},{"vertexs":[{"x":7,"y":13},{"x":7,"y":14},{"x":4,"y":14},{"x":4,"y":13}],"numberEdges":4,"color":["#F05722","#E3421E"],"pos":{"x":-1.233618738129735,"y":0}},{"vertexs":[{"x":4,"y":13},{"x":4,"y":14},{"x":3,"y":14},{"x":3,"y":13}],"numberEdges":4,"color":["#F4DF3B","#EBC12C"],"pos":{"x":-6.268920831847936,"y":0}}]
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
