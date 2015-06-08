(function(){

function lvl20(io){
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
	   
}; iio.lvl20 = lvl20;

lvl20.prototype.setup = function(){
levelBuilder.setup(this,'lvl5');
	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":9.5,"y":16},{"x":9,"y":16},{"x":9,"y":13},{"x":9.5,"y":13}],"numberEdges":4,"color":["#7E3794","#491F81"],"pos":{"x":0.8247582884505391,"y":0}},{"vertexs":[{"x":8.5,"y":16},{"x":8,"y":16},{"x":8,"y":13},{"x":8.5,"y":13}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":-5.901198758278042,"y":0}},{"vertexs":[{"x":7.5,"y":16},{"x":7,"y":16},{"x":7,"y":13},{"x":7.5,"y":13}],"numberEdges":4,"color":["#4D4D4D","#151515"],"pos":{"x":6.32668329635635,"y":0}},{"vertexs":[{"x":6.5,"y":16},{"x":6,"y":16},{"x":6,"y":13},{"x":6.5,"y":13}],"numberEdges":4,"color":["#F05722","#E3421E"],"pos":{"x":0.8903111326508224,"y":0}},{"vertexs":[{"x":5.5,"y":16},{"x":5,"y":16},{"x":5,"y":13},{"x":5.5,"y":13}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":-5.048419460188597,"y":0}},{"vertexs":[{"x":4.5,"y":16},{"x":4,"y":16},{"x":4,"y":13},{"x":4.5,"y":13}],"numberEdges":4,"color":["#CDDC39","#B9C246"],"pos":{"x":5.948863944970071,"y":0}},{"vertexs":[{"x":3.5,"y":16},{"x":3,"y":16},{"x":3,"y":13},{"x":3.5,"y":13}],"numberEdges":4,"color":["#F4DF3B","#EBC12C"],"pos":{"x":-3.6652134945616126,"y":0}}]
);

}//SETUP

lvl20.prototype.step = function(){
	levelBuilder.step(this);

}//STEP


iio.AppManager.prototype.activatelvl20 = function(io){
	this.level = new iio.lvl20(io);
	return this.level;
}

})();