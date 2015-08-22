(function(){

function lvl1(io){
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



}; iio.lvl1 = lvl1;

lvl1.prototype.setup = function(){

	levelBuilder.setup(this,'lvl1');
	levelBuilder.blockBuilder([{"vertexs":[{"x":7,"y":8.5},{"x":7,"y":11.5},{"x":3.5,"y":11.5},{"x":3.5,"y":8.5}],"numberEdges":4,"color":colors['red'],"pos":{"x":0.8406879096291959,"y":0}},{"vertexs":[{"x":6.5,"y":8.5},{"x":4,"y":8.5},{"x":4,"y":6},{"x":6.5,"y":6}],"numberEdges":4,"color":["#A61D4C","#720D37"],"pos":{"x":-5.8901550830341876,"y":0}},{"vertexs":[{"x":6,"y":6},{"x":4.5,"y":6},{"x":4.5,"y":4},{"x":6,"y":4}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":-1.6983758048154414,"y":0}},{"vertexs":[{"x":2.5,"y":13},{"x":2.5,"y":14.5},{"x":1,"y":14.5},{"x":1,"y":13}],"numberEdges":4,"color":["#3F5CA9","#34318A"],"pos":{"x":-3.586430002003908,"y":0}}]
	);




}//SETUP

lvl1.prototype.step = function(){
	levelBuilder.step(this);

}//STEP

iio.AppManager.prototype.activatelvl1 = function(io){
	this.level = new iio.lvl1(io);
	return this.level;
}

})();
