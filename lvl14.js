(function(){

function lvl14(io){
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
	   
}; iio.lvl14 = lvl14;

lvl14.prototype.setup = function(){
	levelBuilder.setup(this,'lvl5');

	levelBuilder.blockBuilder([{"vertexs":[{"x":7.966666666666667,"y":15.066666666666666},{"x":7,"y":15.066666666666666},{"x":6,"y":14.033333333333333},{"x":6.033333333333333,"y":13.033333333333333},{"x":9.066666666666666,"y":13.066666666666666},{"x":9.066666666666666,"y":14}],"numberEdges":6,"color":["#CDDC39","#B9C246"],"pos":{"x":1.9162049237638712,"y":0}},{"vertexs":[{"x":10.633333333333333,"y":13.1},{"x":10.333333333333334,"y":14.933333333333334},{"x":9.7,"y":14.933333333333334},{"x":9.3,"y":13.1}],"numberEdges":4,"color":["#A61D4C","#720D37"],"pos":{"x":2.9125765254721045,"y":0}},{"vertexs":[{"x":5.933333333333334,"y":13.033333333333333},{"x":5.933333333333334,"y":15.033333333333333},{"x":3.966666666666667,"y":15},{"x":4,"y":13.233333333333333}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":-0.8253966835327446,"y":0}},{"vertexs":[{"x":5.933333333333334,"y":12.866666666666667},{"x":5.933333333333334,"y":13.9},{"x":3.2333333333333334,"y":14.433333333333334},{"x":3.1333333333333333,"y":12.933333333333334}],"numberEdges":4,"color":["#F05722","#E3421E"],"pos":{"x":4.95957342768088,"y":0}},{"vertexs":[{"x":2.966666666666667,"y":12.033333333333333},{"x":2.933333333333333,"y":14.1},{"x":1,"y":13.066666666666666}],"numberEdges":3,"color":["#11A9CC","#1B7DB1"],"pos":{"x":4.321008825208992,"y":0}},{"vertexs":[{"x":0.9666666666666667,"y":11.933333333333334},{"x":0.9666666666666667,"y":14.966666666666667},{"x":0.06666666666666667,"y":15.066666666666666},{"x":0.03333333333333333,"y":12.066666666666666}],"numberEdges":4,"color":["#795548","#451F14"],"pos":{"x":-3.6517865383066237,"y":0}}]
);
}//SETUP

lvl14.prototype.step = function(){
	levelBuilder.step(this);

}//STEP

iio.AppManager.prototype.activatelvl14 = function(io){
	this.level = new iio.lvl14(io);
	return this.level;
}

})();