(function(){

function lvl17(io){
	//CANVAS VARS
	this.io = io;
	this.cHeight = io.canvas.height;
	this.cWidth = io.canvas.width;
	this.imgPath = 'img/';
	this.loadResources = 0;
	this.totalResources = 5;
	
	//GAME VARS
	this.goal =
	this.goalTouch =
	this.goalEffect = undefined;
	this.goalTime = 150;
	this.goalTouchTime = 0;
	this.gameWin = 
	this.gameEnd = false;
	   
}; iio.lvl17 = lvl17;

lvl17.prototype.setup = function(){

	

lol(this);



	
	//SHAPES!
	var bodyDef = new b2BodyDef;

	fixDef = new b2FixtureDef;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.3;
	fixDef.density = 5;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	
	
	blocksList = [{"vertexs":[{"x":8,"y":14},{"x":8,"y":16},{"x":6,"y":16},{"x":6,"y":14}],"numberEdges":4,"color":["#4285F4","#355BD8"],"pos":{"x":-5.329905851278454,"y":0}},{"vertexs":[{"x":6,"y":15},{"x":6,"y":16},{"x":5,"y":16},{"x":5,"y":15}],"numberEdges":4,"color":["#7E3794","#491F81"],"pos":{"x":5.976412937510759,"y":0}},{"vertexs":[{"x":6,"y":15},{"x":5,"y":15},{"x":5,"y":14},{"x":6,"y":14}],"numberEdges":4,"color":["#A61D4C","#720D37"],"pos":{"x":-2.6794138052500784,"y":0}},{"vertexs":[{"x":5,"y":15},{"x":5,"y":16},{"x":4,"y":16},{"x":4,"y":15}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":-4.14712494565174,"y":0}},{"vertexs":[{"x":5,"y":15},{"x":4,"y":15},{"x":4,"y":14},{"x":5,"y":14}],"numberEdges":4,"color":["#DB4437","#c82a23"],"pos":{"x":5.362412312533706,"y":0}},{"vertexs":[{"x":4,"y":16},{"x":3,"y":16},{"x":3,"y":15},{"x":4,"y":15}],"numberEdges":4,"color":["#4D4D4D","#151515"],"pos":{"x":-2.5184352369979024,"y":0}},{"vertexs":[{"x":4,"y":15},{"x":3,"y":15},{"x":3,"y":14},{"x":4,"y":14}],"numberEdges":4,"color":["#3F5CA9","#34318A"],"pos":{"x":2.3752788859419525,"y":0}},{"vertexs":[{"x":3,"y":15},{"x":3,"y":16},{"x":2,"y":16},{"x":2,"y":15}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":-6.640914254821837,"y":0}},{"vertexs":[{"x":3,"y":15},{"x":2,"y":15},{"x":2,"y":14},{"x":3,"y":14}],"numberEdges":4,"color":["#F4DF3B","#EBC12C"],"pos":{"x":4.426354376133531,"y":0}},{"vertexs":[{"x":2,"y":15},{"x":2,"y":16},{"x":1,"y":16},{"x":1,"y":15}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":3.9103738074190915,"y":0}},{"vertexs":[{"x":2,"y":14},{"x":2,"y":15},{"x":1,"y":15},{"x":1,"y":14}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":-2.348338860552758,"y":0}}];

	if(blocksList){
		for(var i = 0; i < blocksList.length ; i++){
			for(index in blocksList[i].vertexs){
				blocksList[i].vertexs[index].x =  pxConv(blocksList[i].vertexs[index].x);
				blocksList[i].vertexs[index].y =  pxConv(blocksList[i].vertexs[index].y);
			}
	
			fixDef.shape.SetAsArray(blocksList[i].vertexs);
			bodyDef.position.Set(0,0);
			prepShape(bodyDef, fixDef).setFillStyle(blocksList[i].color[0]).setStrokeStyle(blocksList[i].color[1],2);  
		}
	}

}//SETUP

lvl17.prototype.step = function(){
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

iio.AppManager.prototype.activatelvl17 = function(io){
	this.level = new iio.lvl17(io);
	return this.level;
}



})();