(function(){

function lvl17(io){
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
}; iio.lvl17 = lvl17;

lvl17.prototype.setup = function(){

	levelBuilder.setup(this,'lvl5', pxConv(this.cWidth,true), 240);

	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":3,"y":12},{"x":1,"y":12},{"x":1,"y":10},{"x":3,"y":10}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":1.3741784524172544,"y":0}},{"vertexs":[{"x":3,"y":10},{"x":1,"y":10},{"x":1,"y":9},{"x":3,"y":9}],"numberEdges":4,"color":colors.yellow,"pos":{"x":-4.92613615328446,"y":0}},{"vertexs":[{"x":3,"y":9},{"x":1,"y":9},{"x":1,"y":8},{"x":3,"y":8}],"numberEdges":4,"color":["#DB4437","#c82a23"],"pos":{"x":-4.805752871092409,"y":0}},{"vertexs":[{"x":3,"y":8},{"x":1,"y":8},{"x":1,"y":7},{"x":3,"y":7}],"numberEdges":4,"color":["#7E3794","#491F81"],"pos":{"x":5.492640750017017,"y":0}},{"vertexs":[{"x":3,"y":7},{"x":1,"y":7},{"x":1,"y":6},{"x":3,"y":6}],"numberEdges":4,"color":colors.green,"pos":{"x":-2.7753267721273005,"y":0}},{"vertexs":[{"x":2,"y":6},{"x":1,"y":6},{"x":1,"y":5},{"x":2,"y":5}],"numberEdges":4,"color":["#795548","#451F14"],"pos":{"x":-3.484142794739455,"y":0}},{"vertexs":[{"x":2,"y":5},{"x":1,"y":5},{"x":1,"y":4},{"x":2,"y":4}],"numberEdges":4,"color":["#F05722","#E3421E"],"pos":{"x":-2.4578227647580206,"y":0}},{"vertexs":[{"x":2,"y":4},{"x":1,"y":4},{"x":1,"y":3},{"x":2,"y":3}],"numberEdges":4,"color":["#4285F4","#355BD8"],"pos":{"x":-4.926261013373733,"y":0}},{"vertexs":[{"x":2,"y":3},{"x":1,"y":3},{"x":2,"y":2}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":-6.464052169583738,"y":0}}]

	);

}//SETUP

lvl17.prototype.step = function(){
	levelBuilder.step(this);

}//STEP

iio.AppManager.prototype.activatelvl17 = function(io){
	this.level = new iio.lvl17(io);
	return this.level;
}



})();
