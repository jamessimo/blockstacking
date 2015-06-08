(function(){

function lvl8(io){
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
	   
}; iio.lvl8 = lvl8;

lvl8.prototype.setup = function(){
	levelBuilder.setup(this,'lvl5');

	levelBuilder.blockBuilder(
[{"vertexs":[{"x":10.19,"y":15.38},{"x":7.87,"y":15.41},{"x":7.79,"y":13.14},{"x":9.89,"y":13.23}],"numberEdges":4,"color":["#7E3794","#491F81"],"pos":{"x":2.394964179955423,"y":0}},{"vertexs":[{"x":7.41,"y":15.61},{"x":4.35,"y":15.69},{"x":4.35,"y":14.91},{"x":7.31,"y":14.6}],"numberEdges":4,"color":["#4285F4","#355BD8"],"pos":{"x":-6.012471902184188,"y":0}},{"vertexs":[{"x":6.96,"y":14.15},{"x":4.99,"y":14.29},{"x":4.91,"y":13.06}],"numberEdges":3,"color":["#795548","#451F14"],"pos":{"x":4.756325294263661,"y":0}},{"vertexs":[{"x":4.05,"y":15.64},{"x":2.11,"y":15.69},{"x":3.97,"y":14.15}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":-1.1407891130074859,"y":0}},{"vertexs":[{"x":3.28,"y":14.04},{"x":1.04,"y":14.57},{"x":0.61,"y":13.39},{"x":2.83,"y":12.47}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":-2.562040526419878,"y":0}},{"vertexs":[{"x":2.85,"y":13.03},{"x":0.88,"y":13.7},{"x":0.77,"y":11.99},{"x":2.27,"y":12.11}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":-2.8514663535170257,"y":0}},{"vertexs":[{"x":7.12,"y":14.54},{"x":5.71,"y":13.79},{"x":5.71,"y":13.23},{"x":7.09,"y":13.34}],"numberEdges":4,"color":["#4285F4","#355BD8"],"pos":{"x":0.9886818793602288,"y":0}},{"vertexs":[{"x":4.59,"y":13.59},{"x":3.25,"y":13.84},{"x":4.37,"y":12.81}],"numberEdges":3,"color":["#F05722","#E3421E"],"pos":{"x":1.5878062257543206,"y":0}}]
	);

}//SETUP

lvl8.prototype.step = function(){

	levelBuilder.step(this);
	
}//STEP

iio.AppManager.prototype.activatelvl8 = function(io){
	this.level = new iio.lvl8(io);
	return this.level;
}

})();