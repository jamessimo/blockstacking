(function(){

function lvl9(io){
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

}; iio.lvl9 = lvl9;

lvl9.prototype.setup = function(){
levelBuilder.setup(this,'lvl5');

	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":7.3,"y":12},{"x":5.3,"y":12},{"x":6.3,"y":10}],"numberEdges":3,"color":["#F4DF3B","#EBC12C"],"pos":{"x":5.133328300900757,"y":0}},{"vertexs":[{"x":5.3,"y":12},{"x":3.3,"y":12},{"x":4.3,"y":10}],"numberEdges":3,"color":["#A61D4C","#720D37"],"pos":{"x":4.899156054016203,"y":0}},{"vertexs":[{"x":6,"y":16},{"x":4,"y":16},{"x":5,"y":14}],"numberEdges":3,"color":["#4D4D4D","#151515"],"pos":{"x":-2.34790251031518,"y":0}},{"vertexs":[{"x":9,"y":13},{"x":9,"y":14},{"x":7,"y":14},{"x":7,"y":13}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":1.743916557636112,"y":0}},{"vertexs":[{"x":3,"y":13},{"x":3,"y":15},{"x":1,"y":15},{"x":1,"y":13}],"numberEdges":4,"color":colors.red,"pos":{"x":-3.1923416825011373,"y":0}},{"vertexs":[{"x":9,"y":13},{"x":9,"y":15},{"x":8,"y":15},{"x":8,"y":13}],"numberEdges":4,"color":["#795548","#451F14"],"pos":{"x":4.949524604249746,"y":0}},{"vertexs":[{"x":8,"y":13},{"x":8,"y":15},{"x":7,"y":15},{"x":7,"y":13}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":-1.0114777232520282,"y":0}}]

	);

}//SETUP

lvl9.prototype.step = function(){
	levelBuilder.step(this);
}//STEP

iio.AppManager.prototype.activatelvl9 = function(io){
	this.level = new iio.lvl9(io);
	return this.level;
}

})();
