(function(){

function lvl21(io){
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
	   
	   
}; iio.lvl21 = lvl21;

lvl21.prototype.setup = function(){
	levelBuilder.setup(this,'lvl5');
	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":10,"y":15},{"x":10,"y":16},{"x":6,"y":16}],"numberEdges":3,"color":["#CDDC39","#B9C246"],"pos":{"x":-5.7082937732338905,"y":0}},{"vertexs":[{"x":6,"y":16},{"x":2,"y":16},{"x":2,"y":15}],"numberEdges":3,"color":["#65B045","#4F8742"],"pos":{"x":-5.586721192579716,"y":0}},{"vertexs":[{"x":9,"y":15},{"x":6,"y":15},{"x":9,"y":14}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":-0.9598058494739234,"y":0}},{"vertexs":[{"x":6,"y":15},{"x":3,"y":15},{"x":3,"y":14}],"numberEdges":3,"color":["#F05722","#E3421E"],"pos":{"x":6.154272870160639,"y":0}},{"vertexs":[{"x":8,"y":14.1},{"x":4,"y":14.1},{"x":4,"y":13.8},{"x":8,"y":13.8}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":6.779631952755153,"y":0}},{"vertexs":[{"x":7,"y":14.1},{"x":5,"y":14.1},{"x":5,"y":13.8},{"x":7,"y":13.8}],"numberEdges":4,"color":["#F05722","#E3421E"],"pos":{"x":-1.537620674353093,"y":0}},{"vertexs":[{"x":2,"y":16},{"x":0,"y":16},{"x":0,"y":14},{"x":2,"y":14}],"numberEdges":4,"color":["#3F5CA9","#34318A"],"pos":{"x":-6.444260944146663,"y":0}}]
	);

}//SETUP

lvl21.prototype.step = function(){
		levelBuilder.step(this);

	
}//STEP

iio.AppManager.prototype.activatelvl21 = function(io){
	this.level = new iio.lvl21(io);
	return this.level;
}

})();