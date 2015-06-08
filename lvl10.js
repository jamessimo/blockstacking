(function(){

function lvl10(io){
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
	   
	   
}; iio.lvl10 = lvl10;

lvl10.prototype.setup = function(){

	levelBuilder.setup(this,'lvl5');

	levelBuilder.blockBuilder([{"vertexs":[{"x":5.49,"y":15.62},{"x":3.31,"y":15.54},{"x":4.51,"y":13.65}],"numberEdges":3,"color":["#CDDC39","#B9C246"],"pos":{"x":-1.5252033490687609,"y":0}},
	{"vertexs":[{"x":5.49,"y":15.62},{"x":3.31,"y":15.54},{"x":4.51,"y":13.65}],"numberEdges":3,"color":["#CDDC39","#B9C246"],"pos":{"x":0,"y":0}},
	{"vertexs":[{"x":5.49,"y":15.62},{"x":3.31,"y":15.54},{"x":4.51,"y":13.65}],"numberEdges":3,"color":["#CDDC39","#B9C246"],"pos":{"x":0,"y":0}},
	{"vertexs":[{"x":9.30,"y":15.78},{"x":7.70,"y":15.78},{"x":7.70,"y":13.95},{"x":9.30,"y":13.95}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":-2.2934139845892787,"y":0}},
	{"vertexs":[{"x":1.79,"y":15.59},{"x":0.33,"y":15.49},{"x":0.41,"y":13.92},{"x":1.77,"y":13.92}],"numberEdges":4,"color":["#DB4437","#c82a23"],"pos":{"x":-3.7640923066064715,"y":0}},
	{"vertexs":[{"x":2,"y":14.05},{"x":0.5,"y":14.03},{"x":0.58,"y":12.27},{"x":1.77,"y":12.27}],"numberEdges":4,"color":["#795548","#451F14"],"pos":{"x":-6.113739041145891,"y":0}},
	{"vertexs":[{"x":2.15,"y":13.51},{"x":0.83,"y":13.3},{"x":1.07,"y":11.76},{"x":2.27,"y":12.05}],"numberEdges":4,"color":["#4D4D4D","#151515"],"pos":{"x":3.873320756945759,"y":0}},
	{"vertexs":[{"x":7.3,"y":14.11},{"x":6.33,"y":13.46},{"x":7.45,"y":12.73}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":-0.024253061041235924,"y":0}}]);

}//SETUP

lvl10.prototype.step = function(){
	levelBuilder.step(this);
}//STEP

iio.AppManager.prototype.activatelvl10 = function(io){
	this.level = new iio.lvl10(io);
	return this.level;
}

})();