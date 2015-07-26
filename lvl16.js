(function(){

function lvl16(io){
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

}; iio.lvl16 = lvl16;

lvl16.prototype.setup = function(){
	levelBuilder.setup(this,'lvl5', pxConv(this.cWidth,true) );

	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":2,"y":12},{"x":0,"y":12},{"x":0,"y":10},{"x":2,"y":10}],"numberEdges":4,"color":colors.navy,"pos":{"x":-2.878496031742543,"y":0}},{"vertexs":[{"x":2,"y":10},{"x":0,"y":10},{"x":0,"y":9},{"x":2,"y":9}],"numberEdges":4,"color":["#DB4437","#c82a23"],"pos":{"x":6.166093253064901,"y":0}},{"vertexs":[{"x":2,"y":9},{"x":0,"y":9},{"x":0,"y":8},{"x":2,"y":8}],"numberEdges":4,"color":["#795548","#451F14"],"pos":{"x":5.816400242969394,"y":0}},{"vertexs":[{"x":3,"y":8},{"x":0,"y":8},{"x":0,"y":7},{"x":3,"y":7}],"numberEdges":4,"color":colors.green,"pos":{"x":0.6955089848488569,"y":0}},{"vertexs":[{"x":2,"y":7},{"x":0,"y":7},{"x":0,"y":5},{"x":2,"y":5}],"numberEdges":4,"color":["#7E3794","#491F81"],"pos":{"x":2.2678276244550943,"y":0}},{"vertexs":[{"x":2,"y":5},{"x":0,"y":5},{"x":0,"y":4},{"x":2,"y":4}],"numberEdges":4,"color":["#A61D4C","#720D37"],"pos":{"x":0.5624864813871682,"y":0}},{"vertexs":[{"x":2,"y":4},{"x":0,"y":4},{"x":1,"y":2}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":-6.559089124202728,"y":0}}]
	);

}//SETUP

lvl16.prototype.step = function(){
	levelBuilder.step(this);

}//STEP

iio.AppManager.prototype.activatelvl16 = function(io){
	this.level = new iio.lvl16(io);
	return this.level;
}

})();
