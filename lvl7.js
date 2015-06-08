(function(){

function lvl7(io){
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
	   
}; iio.lvl7 = lvl7;

lvl7.prototype.setup = function(){

	

	levelBuilder.setup(this,'lvl5');

	levelBuilder.blockBuilder(
[{"vertexs":[{"x":10.13,"y":15.54},{"x":6.83,"y":15.46},{"x":7.57,"y":14.65},{"x":9.49,"y":14.65}],"numberEdges":4,"color":["#CDDC39","#B9C246"],"pos":{"x":-0.9877829519100487,"y":0}},{"vertexs":[{"x":9.52,"y":14.84},{"x":7.63,"y":14.97},{"x":7.57,"y":13.22},{"x":9.33,"y":13.3}],"numberEdges":4,"color":["#CDDC39","#B9C246"],"pos":{"x":5.12882109452039,"y":0}},{"vertexs":[{"x":7.31,"y":14.81},{"x":6.51,"y":15.51},{"x":5.57,"y":15.43},{"x":5.2,"y":14.68},{"x":5.81,"y":13.95},{"x":6.75,"y":14.08}],"numberEdges":6,"color":["#4285F4","#355BD8"],"pos":{"x":1.0037043229676783,"y":0}},{"vertexs":[{"x":7.41,"y":14.76},{"x":6.27,"y":13.78},{"x":7.36,"y":13}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":-6.787294975481927,"y":0}},{"vertexs":[{"x":2.75,"y":15.46},{"x":0.37,"y":15.32},{"x":0.61,"y":13.35},{"x":2.61,"y":13.62}],"numberEdges":4,"color":["#4285F4","#355BD8"],"pos":{"x":-4.229009584058076,"y":0}},{"vertexs":[{"x":4.67,"y":15.59},{"x":2.88,"y":14.32},{"x":4.77,"y":14.89}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":3.6088224961422384,"y":0}},{"vertexs":[{"x":4.96,"y":14.65},{"x":2.85,"y":14.68},{"x":3.09,"y":14}],"numberEdges":3,"color":["#795548","#451F14"],"pos":{"x":-1.0106536303646863,"y":0}},{"vertexs":[{"x":5.01,"y":14.51},{"x":3.07,"y":14.49},{"x":3.12,"y":12.89},{"x":4.93,"y":13.08}],"numberEdges":4,"color":["#CDDC39","#B9C246"],"pos":{"x":2.367884045932442,"y":0}}]
	);



}//SETUP

lvl7.prototype.step = function(){
	var lio = this;
	
	if(this.gameEnd == true){
	}
	
	if(this.goalTouchTime >= this.goalTime){
		this.gameWin = true;
	}

	if(this.goalTouch){
		if(this.goalTouch.GetBody() != selectedBody){
			this.goalEffect.radius = this.goalTouchTime;
			this.goalTouchTime++;
		}else{
			this.goalTouchTime = 0; 
			this.goalEffect.radius = this.goalTouchTime;
		}
	}

	listener.BeginContact = function(contact) {
		if(contact.GetFixtureB().GetUserData() == 'goal'){
			lio.goalTouch = contact.GetFixtureA();
			lio.goal = contact.GetFixtureB();
		}
	}
	listener.EndContact = function(contact) {
		if(contact.GetFixtureB().GetUserData() == 'goal'){
			lio.goalTouchTime = 0; 
			lio.goalTouch = undefined;
			lio.goalEffect.radius = 0;
		}
	}
	
}//STEP

iio.AppManager.prototype.activatelvl7 = function(io){
	this.level = new iio.lvl7(io);
	return this.level;
}

})();