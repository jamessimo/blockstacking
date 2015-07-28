(function(){

function lvl23(io){
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

}; iio.lvl23 = lvl23;

lvl23.prototype.setup = function(){
levelBuilder.setup(this,'lvl5');
	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":2.5,"y":14},{"x":1.5,"y":14},{"x":2,"y":12.5}],"numberEdges":3,"color":colors.yellow,"pos":{"x":6.103950971737504,"y":0}},{"vertexs":[{"x":8.5,"y":14.5},{"x":9,"y":15.5},{"x":8,"y":15.5}],"numberEdges":3,"color":colors.red,"pos":{"x":-4.775288098026067,"y":0}},{"vertexs":[{"x":9,"y":15},{"x":8,"y":15},{"x":8.5,"y":14}],"numberEdges":3,"color":["#E7981D","#E05C16"],"pos":{"x":5.325987839139998,"y":0}},{"vertexs":[{"x":7.5,"y":15},{"x":8,"y":16},{"x":7,"y":16}],"numberEdges":3,"color":["#A61D4C","#720D37"],"pos":{"x":3.035740131046623,"y":0}},{"vertexs":[{"x":9,"y":14},{"x":6,"y":14},{"x":6,"y":13.5},{"x":9,"y":13.5}],"numberEdges":4,"color":["#3F5CA9","#34318A"],"pos":{"x":4.48695990210399,"y":0}},{"vertexs":[{"x":8.5,"y":13.5},{"x":8.5,"y":14},{"x":6,"y":14},{"x":6,"y":13.5}],"numberEdges":4,"color":["#7E3794","#491F81"],"pos":{"x":6.642385371029377,"y":0}},{"vertexs":[{"x":7,"y":16},{"x":5,"y":16},{"x":5,"y":15},{"x":7,"y":14.5}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":2.8282114039175212,"y":0}},{"vertexs":[{"x":4.5,"y":14.5},{"x":2.5,"y":15},{"x":2.5,"y":14},{"x":4.5,"y":14}],"numberEdges":4,"color":["#CDDC39","#B9C246"],"pos":{"x":6.40895854588598,"y":0}},{"vertexs":[{"x":4.5,"y":14.5},{"x":3,"y":14.5},{"x":3,"y":13.5},{"x":4.5,"y":13.5}],"numberEdges":4,"color":colors.blue,"pos":{"x":-3.425470062531531,"y":0}},{"vertexs":[{"x":3,"y":13},{"x":3,"y":14.5},{"x":2,"y":14.5},{"x":2,"y":13}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":3.6113734198734164,"y":0}},{"vertexs":[{"x":2,"y":15.5},{"x":1,"y":15.5},{"x":1.5,"y":14.5}],"numberEdges":3,"color":["#4D4D4D","#151515"],"pos":{"x":0.7215505163185298,"y":0}}]

);


}//SETUP

lvl23.prototype.step = function(){
		levelBuilder.step(this);

}//STEP

iio.AppManager.prototype.activatelvl23 = function(io){
	this.level = new iio.lvl23(io);
	return this.level;
}

})();
