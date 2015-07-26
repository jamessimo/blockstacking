(function(){

function lvl19(io){
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
}; iio.lvl19 = lvl19;

lvl19.prototype.setup = function(){
levelBuilder.setup(this,'lvl5');
	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":10.5,"y":14.8},{"x":10.5,"y":15.8},{"x":9.266666666666667,"y":15.8},{"x":9.266666666666667,"y":14.766666666666667}],"numberEdges":4,"color":["#7E3794","#491F81"],"pos":{"x":0.1998001467436552,"y":0}},{"vertexs":[{"x":8.333333333333334,"y":14.666666666666666},{"x":8.3,"y":15.9},{"x":6.966666666666667,"y":15.966666666666667},{"x":6.9,"y":14.7}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":2.50854915054515,"y":0}},{"vertexs":[{"x":6.8,"y":14.766666666666667},{"x":6.8,"y":15.9},{"x":5.666666666666667,"y":15.9},{"x":5.666666666666667,"y":14.8}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":-1.1801214264705777,"y":0}},{"vertexs":[{"x":5.466666666666667,"y":14.6},{"x":5.466666666666667,"y":15.833333333333334},{"x":4.333333333333333,"y":15.8},{"x":4.333333333333333,"y":14.633333333333333}],"numberEdges":4,"color":colors.red,"pos":{"x":0.4925124002620578,"y":0}},{"vertexs":[{"x":4,"y":14.733333333333333},{"x":4.033333333333333,"y":15.933333333333334},{"x":2.8333333333333335,"y":15.9},{"x":2.8333333333333335,"y":14.8}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":2.837339877616614,"y":0}},{"vertexs":[{"x":2.6666666666666665,"y":14.633333333333333},{"x":2.6666666666666665,"y":15.9},{"x":1.5,"y":15.866666666666667},{"x":1.5,"y":14.7}],"numberEdges":4,"color":["#A61D4C","#720D37"],"pos":{"x":6.108398129232228,"y":0}},{"vertexs":[{"x":1.2333333333333334,"y":14.733333333333333},{"x":1.2333333333333334,"y":15.9},{"x":0.06666666666666667,"y":15.833333333333334},{"x":0.13333333333333333,"y":14.633333333333333}],"numberEdges":4,"color":["#795548","#451F14"],"pos":{"x":-6.989775681402534,"y":0}},{"vertexs":[{"x":10.333333333333334,"y":14.4},{"x":8.866666666666667,"y":14.433333333333334},{"x":9.533333333333333,"y":12.566666666666666}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":-5.034772368147969,"y":0}}]
	);



}//SETUP

lvl19.prototype.step = function(){
	levelBuilder.step(this);

}//STEP

iio.AppManager.prototype.activatelvl19 = function(io){
	this.level = new iio.lvl19(io);
	return this.level;
}

})();
