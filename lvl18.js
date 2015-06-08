(function(){

function lvl18(io){
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
	   
}; iio.lvl18 = lvl18;

lvl18.prototype.setup = function(){
	levelBuilder.setup(this,'lvl5');
	levelBuilder.blockBuilder(
		[{"vertexs":[{"x":8,"y":14},{"x":8,"y":16},{"x":6,"y":16},{"x":6,"y":14}],"numberEdges":4,"color":["#4285F4","#355BD8"],"pos":{"x":-5.329905851278454,"y":0}},{"vertexs":[{"x":6,"y":15},{"x":6,"y":16},{"x":5,"y":16},{"x":5,"y":15}],"numberEdges":4,"color":["#7E3794","#491F81"],"pos":{"x":5.976412937510759,"y":0}},{"vertexs":[{"x":6,"y":15},{"x":5,"y":15},{"x":5,"y":14},{"x":6,"y":14}],"numberEdges":4,"color":["#A61D4C","#720D37"],"pos":{"x":-2.6794138052500784,"y":0}},{"vertexs":[{"x":5,"y":15},{"x":5,"y":16},{"x":4,"y":16},{"x":4,"y":15}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":-4.14712494565174,"y":0}},{"vertexs":[{"x":5,"y":15},{"x":4,"y":15},{"x":4,"y":14},{"x":5,"y":14}],"numberEdges":4,"color":["#DB4437","#c82a23"],"pos":{"x":5.362412312533706,"y":0}},{"vertexs":[{"x":4,"y":16},{"x":3,"y":16},{"x":3,"y":15},{"x":4,"y":15}],"numberEdges":4,"color":["#4D4D4D","#151515"],"pos":{"x":-2.5184352369979024,"y":0}},{"vertexs":[{"x":4,"y":15},{"x":3,"y":15},{"x":3,"y":14},{"x":4,"y":14}],"numberEdges":4,"color":["#3F5CA9","#34318A"],"pos":{"x":2.3752788859419525,"y":0}},{"vertexs":[{"x":3,"y":15},{"x":3,"y":16},{"x":2,"y":16},{"x":2,"y":15}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":-6.640914254821837,"y":0}},{"vertexs":[{"x":3,"y":15},{"x":2,"y":15},{"x":2,"y":14},{"x":3,"y":14}],"numberEdges":4,"color":["#F4DF3B","#EBC12C"],"pos":{"x":4.426354376133531,"y":0}},{"vertexs":[{"x":2,"y":15},{"x":2,"y":16},{"x":1,"y":16},{"x":1,"y":15}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":3.9103738074190915,"y":0}},{"vertexs":[{"x":2,"y":14},{"x":2,"y":15},{"x":1,"y":15},{"x":1,"y":14}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":-2.348338860552758,"y":0}}]
	);


}//SETUP

lvl18.prototype.step = function(){
	levelBuilder.step(this);

	
}//STEP

iio.AppManager.prototype.activatelvl18 = function(io){
	this.level = new iio.lvl18(io);
	return this.level;
}

})();