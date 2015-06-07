(function(){

function lvl14(io){
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
	   
}; iio.lvl14 = lvl14;

lvl14.prototype.setup = function(){

	this.io.addToGroup('BACKGROUND',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2),pxConv(this.cWidth),pxConv(this.cHeight)).addImage(this.imgPath+'lvl14.png'),-30);

	GAMEAREA = this.io.addToGroup('GAMEAREA',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2 - 20),pxConv(this.cWidth/2),pxConv(300))
		.setFillStyle('rgba(0,0,0,0.0)')
		,-20);

	this.goalPos = new iio.Vec(this.cWidth/2, GAMEAREA.pos.y-(GAMEAREA.height/2));
	this.platformPos = new iio.Vec(this.cWidth/2, GAMEAREA.pos.y+(GAMEAREA.height/2));

	var fixDef = new b2FixtureDef;
	fixDef.friction = 1;
	fixDef.restitution = 0.5;
	
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	
	//GROUND
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(this.cWidth/2,true),pxConv(1,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight,true));
	prepShape(bodyDef, fixDef);

	//BASIN WALLS
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(1,true),pxConv(150/2,true));
	bodyDef.position.Set(pxConv(0 - 0,true),pxConv(this.cHeight - 75,true));
	prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(1,true),pxConv(150/2,true));
	bodyDef.position.Set(pxConv(this.cWidth - 0,true),pxConv(this.cHeight - 75,true));
	prepShape(bodyDef, fixDef);
	
	//WORLD BOUNDRIES
	fixDef.friction = 0;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(200,true));
	bodyDef.angle=-Math.PI/6;
	bodyDef.position.Set(pxConv(0 - 100,true),pxConv(this.cHeight - 320,true));
	prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(200,true));
	bodyDef.angle=Math.PI/6;
	bodyDef.position.Set(pxConv(this.cWidth + 100,true),pxConv(this.cHeight - 320,true));
	prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(210,true));
	bodyDef.angle=-Math.PI/3;
	bodyDef.position.Set(pxConv(this.cWidth + 30,true),pxConv(-110,true));
	prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(210,true));
	bodyDef.angle=Math.PI/3;
	bodyDef.position.Set(pxConv(-30,true),pxConv(-110,true));
	prepShape(bodyDef, fixDef);
	
	//PLATFORM
	fixDef.friction = 1;
	bodyDef.angle = 0;
	bodyDef.type = b2Body.b2_staticBody;
	bodyDef.position.Set(pxConv(this.platformPos.x,true),pxConv(this.platformPos.y/PIXEL_RATIO,true));	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(this.cWidth/5.1,true),pxConv(5,true));
	prepShape(bodyDef, fixDef).setFillStyle(colors['brown'][0]);

	//GOAL
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.isSensor = true;
	fixDef.userData = 'goal';
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(62/2,true),pxConv(59/2,true));
	bodyDef.position.Set(pxConv(this.goalPos.x,true), pxConv(this.goalPos.y/PIXEL_RATIO,true));
	this.goalEffect = this.io.addToGroup('GOALEFFECTS', new iio.Circle(pxConv(this.goalPos.x),pxConv(this.goalPos.y/PIXEL_RATIO),0).setFillStyle('rgba(255,255,255,0.4)'));
	prepShape(bodyDef, fixDef).addImage(this.imgPath + 'star.png')
	
	//SHAPES!
	fixDef = new b2FixtureDef;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.3;
	fixDef.density = 5;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	
	
	blocksList = [{"vertexs":[{"x":10.5,"y":14.8},{"x":10.5,"y":15.8},{"x":9.266666666666667,"y":15.8},{"x":9.266666666666667,"y":14.766666666666667}],"numberEdges":4,"color":["#7E3794","#491F81"],"pos":{"x":0.1998001467436552,"y":0}},{"vertexs":[{"x":8.333333333333334,"y":14.666666666666666},{"x":8.3,"y":15.9},{"x":6.966666666666667,"y":15.966666666666667},{"x":6.9,"y":14.7}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":2.50854915054515,"y":0}},{"vertexs":[{"x":6.8,"y":14.766666666666667},{"x":6.8,"y":15.9},{"x":5.666666666666667,"y":15.9},{"x":5.666666666666667,"y":14.8}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":-1.1801214264705777,"y":0}},{"vertexs":[{"x":5.466666666666667,"y":14.6},{"x":5.466666666666667,"y":15.833333333333334},{"x":4.333333333333333,"y":15.8},{"x":4.333333333333333,"y":14.633333333333333}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":0.4925124002620578,"y":0}},{"vertexs":[{"x":4,"y":14.733333333333333},{"x":4.033333333333333,"y":15.933333333333334},{"x":2.8333333333333335,"y":15.9},{"x":2.8333333333333335,"y":14.8}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":2.837339877616614,"y":0}},{"vertexs":[{"x":2.6666666666666665,"y":14.633333333333333},{"x":2.6666666666666665,"y":15.9},{"x":1.5,"y":15.866666666666667},{"x":1.5,"y":14.7}],"numberEdges":4,"color":["#A61D4C","#720D37"],"pos":{"x":6.108398129232228,"y":0}},{"vertexs":[{"x":1.2333333333333334,"y":14.733333333333333},{"x":1.2333333333333334,"y":15.9},{"x":0.06666666666666667,"y":15.833333333333334},{"x":0.13333333333333333,"y":14.633333333333333}],"numberEdges":4,"color":["#795548","#451F14"],"pos":{"x":-6.989775681402534,"y":0}},{"vertexs":[{"x":10.333333333333334,"y":14.4},{"x":8.866666666666667,"y":14.433333333333334},{"x":9.533333333333333,"y":12.566666666666666}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":-5.034772368147969,"y":0}}];


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

lvl14.prototype.step = function(){
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

iio.AppManager.prototype.activatelvl14 = function(io){
	this.level = new iio.lvl14(io);
	return this.level;
}

})();