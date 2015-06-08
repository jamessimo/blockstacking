(function(){

function lvl5(io){
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
	   
}; iio.lvl5 = lvl5;

lvl5.prototype.setup = function(){
	
	levelBuilder.setup(this,'lvl5');

	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":8,"y":14},{"x":8,"y":15},{"x":7,"y":16},{"x":6,"y":16},{"x":5,"y":15}],"numberEdges":5,"color":["#4285F4","#355BD8"],"pos":{"x":-6.362795546185225,"y":0}},{"vertexs":[{"x":8,"y":14},{"x":5,"y":15},{"x":5,"y":14},{"x":6,"y":13},{"x":7,"y":13}],"numberEdges":5,"color":["#4285F4","#355BD8"],"pos":{"x":4.667743229772896,"y":0}},{"vertexs":[{"x":5,"y":13},{"x":5,"y":15},{"x":3,"y":15},{"x":3,"y":13}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":-0.6335226441733539,"y":0}},{"vertexs":[{"x":3,"y":14},{"x":3,"y":16},{"x":1,"y":16},{"x":1,"y":14}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":-0.5474055926315486,"y":0}},{"vertexs":[{"x":10,"y":14},{"x":10,"y":16},{"x":8,"y":16},{"x":8,"y":14}],"numberEdges":4,"color":["#795548","#451F14"],"pos":{"x":-0.8793000471778214,"y":0}}]
	);


}//SETUP

lvl5.prototype.step = function(){
	levelBuilder.step(this);
}//STEP

iio.AppManager.prototype.activatelvl5 = function(io){
	this.level = new iio.lvl5(io);
	return this.level;
}

})();