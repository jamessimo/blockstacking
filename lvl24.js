(function(){

function lvl24(io){
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
	   
}; iio.lvl24 = lvl24;

lvl24.prototype.setup = function(){
	levelBuilder.setup(this,'lvl5');
	levelBuilder.blockBuilder(
[{"vertexs":[{"x":10,"y":15},{"x":10,"y":16},{"x":9,"y":16}],"numberEdges":3,"color":["#DB4437","#c82a23"],"pos":{"x":-3.7710872879251838,"y":0}},{"vertexs":[{"x":10,"y":14},{"x":9,"y":15},{"x":9,"y":14}],"numberEdges":3,"color":["#65B045","#4F8742"],"pos":{"x":-5.337372406385839,"y":0}},{"vertexs":[{"x":9,"y":14},{"x":9,"y":15},{"x":8,"y":15}],"numberEdges":3,"color":["#F05722","#E3421E"],"pos":{"x":1.5310926283709705,"y":0}},{"vertexs":[{"x":8,"y":15},{"x":7,"y":15},{"x":8,"y":14}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":5.788443483877927,"y":0}},{"vertexs":[{"x":8,"y":14},{"x":7,"y":15},{"x":7,"y":14}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":-2.6268735858611763,"y":0}},{"vertexs":[{"x":7,"y":15},{"x":6,"y":15},{"x":6,"y":14}],"numberEdges":3,"color":["#F05722","#E3421E"],"pos":{"x":-6.354688024148345,"y":0}},{"vertexs":[{"x":6,"y":14},{"x":5,"y":15},{"x":5,"y":14}],"numberEdges":3,"color":["#795548","#451F14"],"pos":{"x":-3.5388546278700233,"y":0}},{"vertexs":[{"x":6,"y":14},{"x":5,"y":15},{"x":5,"y":14}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":4.432527526747435,"y":0}},{"vertexs":[{"x":5,"y":14},{"x":4,"y":15},{"x":4,"y":14}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":2.790998543612659,"y":0}},{"vertexs":[{"x":6,"y":15},{"x":5,"y":15},{"x":6,"y":14}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":6.860954067204148,"y":0}},{"vertexs":[{"x":3,"y":14},{"x":3,"y":15},{"x":2,"y":15}],"numberEdges":3,"color":["#F05722","#E3421E"],"pos":{"x":-3.8550641485489905,"y":0}},{"vertexs":[{"x":3,"y":14},{"x":2,"y":15},{"x":2,"y":14}],"numberEdges":3,"color":["#4D4D4D","#151515"],"pos":{"x":-1.331401688978076,"y":0}},{"vertexs":[{"x":2,"y":14},{"x":2,"y":15},{"x":1,"y":15}],"numberEdges":3,"color":["#11A9CC","#1B7DB1"],"pos":{"x":4.62044172314927,"y":0}},{"vertexs":[{"x":2,"y":14},{"x":1,"y":15},{"x":1,"y":14}],"numberEdges":3,"color":["#CDDC39","#B9C246"],"pos":{"x":-1.3216117224656045,"y":0}},{"vertexs":[{"x":4,"y":14},{"x":3,"y":15},{"x":3,"y":14}],"numberEdges":3,"color":["#795548","#451F14"],"pos":{"x":-5.072187028825283,"y":0}},{"vertexs":[{"x":3,"y":13},{"x":2,"y":14},{"x":2,"y":13}],"numberEdges":3,"color":["#795548","#451F14"],"pos":{"x":-0.5015359465032816,"y":0}},{"vertexs":[{"x":3,"y":13},{"x":3,"y":14},{"x":2,"y":14}],"numberEdges":3,"color":["#F4DF3B","#EBC12C"],"pos":{"x":6.116835776716471,"y":0}},{"vertexs":[{"x":6,"y":13},{"x":6,"y":14},{"x":5,"y":14}],"numberEdges":3,"color":["#11A9CC","#1B7DB1"],"pos":{"x":-5.340043952688575,"y":0}},{"vertexs":[{"x":7,"y":13},{"x":7,"y":14},{"x":6,"y":14}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":-5.709018740803003,"y":0}},{"vertexs":[{"x":7,"y":13},{"x":6,"y":14},{"x":6,"y":13}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":-2.393278853967786,"y":0}},{"vertexs":[{"x":9,"y":14},{"x":9,"y":15},{"x":8,"y":15}],"numberEdges":3,"color":["#F4DF3B","#EBC12C"],"pos":{"x":4.039731122087687,"y":0}},{"vertexs":[{"x":2,"y":14},{"x":2,"y":15},{"x":1,"y":15}],"numberEdges":3,"color":["#11A9CC","#1B7DB1"],"pos":{"x":-4.676753685344011,"y":0}},{"vertexs":[{"x":2,"y":14},{"x":1,"y":15},{"x":1,"y":14}],"numberEdges":3,"color":["#DB4437","#c82a23"],"pos":{"x":6.753075315151364,"y":0}},{"vertexs":[{"x":1,"y":15},{"x":1,"y":16},{"x":0,"y":16}],"numberEdges":3,"color":["#4D4D4D","#151515"],"pos":{"x":4.377516084816307,"y":0}},{"vertexs":[{"x":1,"y":15},{"x":0,"y":16},{"x":0,"y":15}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":6.047792010009289,"y":0}},{"vertexs":[{"x":1,"y":14},{"x":1,"y":15},{"x":0,"y":15}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":-3.768914836458862,"y":0}},{"vertexs":[{"x":3,"y":13},{"x":3,"y":14},{"x":2,"y":14}],"numberEdges":3,"color":["#CDDC39","#B9C246"],"pos":{"x":1.3033272800967097,"y":0}},{"vertexs":[{"x":3,"y":13},{"x":2,"y":14},{"x":2,"y":13}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":-5.426589127164334,"y":0}},{"vertexs":[{"x":2,"y":13},{"x":2,"y":14},{"x":1,"y":14}],"numberEdges":3,"color":["#65B045","#4F8742"],"pos":{"x":-3.23960202652961,"y":0}},{"vertexs":[{"x":5,"y":13},{"x":5,"y":14},{"x":4,"y":14}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":0.7075655637308955,"y":0}},{"vertexs":[{"x":5,"y":14},{"x":4,"y":13},{"x":5,"y":13}],"numberEdges":3,"color":["#65B045","#4F8742"],"pos":{"x":-3.0239652264863253,"y":0}},{"vertexs":[{"x":10,"y":13},{"x":10,"y":14},{"x":9,"y":14}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":1.0207472117617726,"y":0}},{"vertexs":[{"x":8,"y":13},{"x":8,"y":14},{"x":7,"y":14}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":0.5366080682724714,"y":0}},{"vertexs":[{"x":8,"y":13},{"x":8,"y":14},{"x":7,"y":14},{"x":7,"y":13}],"numberEdges":4,"color":["#4D4D4D","#151515"],"pos":{"x":-5.554228187073022,"y":0}}]
	);

}//SETUP

lvl24.prototype.step = function(){
	levelBuilder.step(this);

}//STEP

iio.AppManager.prototype.activatelvl24 = function(io){
	this.level = new iio.lvl24(io);
	return this.level;
}

})();