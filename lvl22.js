(function(){

function lvl22(io){
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
	   
}; iio.lvl22 = lvl22;

lvl22.prototype.setup = function(){
levelBuilder.setup(this,'lvl5');
	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":10,"y":14},{"x":10,"y":16},{"x":8,"y":16}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":4.081204281654209,"y":0}},{"vertexs":[{"x":10,"y":12},{"x":8,"y":14},{"x":8,"y":12}],"numberEdges":3,"color":["#DB4437","#c82a23"],"pos":{"x":0.9829496229067445,"y":0}},{"vertexs":[{"x":8,"y":13},{"x":8,"y":15},{"x":6,"y":15}],"numberEdges":3,"color":["#A61D4C","#720D37"],"pos":{"x":1.9176260535605252,"y":0}},{"vertexs":[{"x":5,"y":16},{"x":3,"y":16},{"x":3,"y":14}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":-1.3803656161762774,"y":0}},{"vertexs":[{"x":6,"y":14},{"x":4,"y":14},{"x":6,"y":12}],"numberEdges":3,"color":["#65B045","#4F8742"],"pos":{"x":-6.302822753321379,"y":0}},{"vertexs":[{"x":3,"y":13},{"x":3,"y":15},{"x":1,"y":15}],"numberEdges":3,"color":["#A61D4C","#720D37"],"pos":{"x":-0.5415297918953001,"y":0}},{"vertexs":[{"x":3,"y":12},{"x":1,"y":14},{"x":1,"y":12}],"numberEdges":3,"color":["#A61D4C","#720D37"],"pos":{"x":-3.02461829315871,"y":0}},{"vertexs":[{"x":5,"y":13},{"x":5,"y":15},{"x":3,"y":13}],"numberEdges":3,"color":["#A61D4C","#720D37"],"pos":{"x":-1.1306470152921975,"y":0}}]

);


}//SETUP

lvl22.prototype.step = function(){
	levelBuilder.step(this);
}//STEP

iio.AppManager.prototype.activatelvl22 = function(io){
	this.level = new iio.lvl22(io);
	return this.level;
}

})();