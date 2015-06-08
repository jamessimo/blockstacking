(function(){

function lvl6(io){
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
	   
}; iio.lvl6 = lvl6;

lvl6.prototype.setup = function(){
	levelBuilder.setup(this,'lvl5');

	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":9.71,"y":15.54},{"x":8.16,"y":15.46},{"x":8.16,"y":14.35},{"x":9.65,"y":14.35}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":-3.5953768752515316,"y":0}},{"vertexs":[{"x":7.6,"y":15.51},{"x":4.83,"y":15.57},{"x":5.55,"y":14.3},{"x":6.93,"y":14.27}],"numberEdges":4,"color":["#3F5CA9","#34318A"],"pos":{"x":-6.071510925423354,"y":0}},{"vertexs":[{"x":5.39,"y":14.46},{"x":4.43,"y":15.65},{"x":2.03,"y":15.62},{"x":3.47,"y":14.35}],"numberEdges":4,"color":["#795548","#451F14"],"pos":{"x":3.1594052924774587,"y":0}},{"vertexs":[{"x":6.77,"y":14.05},{"x":4.83,"y":14.11},{"x":4.8,"y":12.86},{"x":6.64,"y":12.81}],"numberEdges":4,"color":["#F4DF3B","#EBC12C"],"pos":{"x":-3.389222521800548,"y":0}},{"vertexs":[{"x":1.68,"y":15.59},{"x":0.19,"y":15.59},{"x":0.08,"y":12.73},{"x":1.57,"y":12.81}],"numberEdges":4,"color":["#7E3794","#491F81"],"pos":{"x":3.456070863176137,"y":0}},{"vertexs":[{"x":10.37,"y":14.08},{"x":7.95,"y":14.27},{"x":7.65,"y":12.08},{"x":10.21,"y":12.05}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":-5.263228894677013,"y":0}}]
	);

}//SETUP

lvl6.prototype.step = function(){
	levelBuilder.step(this);
}//STEP

iio.AppManager.prototype.activatelvl6 = function(io){
	this.level = new iio.lvl6(io);
	return this.level;
}

})();