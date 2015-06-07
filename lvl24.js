(function(){

function lvl24(io){
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
	   
}; iio.lvl24 = lvl24;

lvl24.prototype.setup = function(){

	this.io.addToGroup('BACKGROUND',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2),pxConv(this.cWidth),pxConv(this.cHeight)).addImage(this.imgPath+'lvl4.png'),-30);

	GAMEAREA = this.io.addToGroup('GAMEAREA',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2 - 20),pxConv(this.cWidth/2),pxConv(300))
		.setFillStyle('rgba(0,0,0,0.5)')
		,-20);

	this.goalPos = new iio.Vec(240, GAMEAREA.pos.y-(GAMEAREA.height/2));
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
	fixDef.friction = 0.1;
	bodyDef.angle = 0;
	bodyDef.type = b2Body.b2_staticBody;
	bodyDef.position.Set(pxConv(this.platformPos.x,true),pxConv(this.platformPos.y/PIXEL_RATIO,true));	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(this.cWidth,true),pxConv(5,true));
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
	
	
	blocksList = [{"vertexs":[{"x":3,"y":12},{"x":1,"y":12},{"x":1,"y":10},{"x":3,"y":10}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":1.3741784524172544,"y":0}},{"vertexs":[{"x":3,"y":10},{"x":1,"y":10},{"x":1,"y":9},{"x":3,"y":9}],"numberEdges":4,"color":["#3F5CA9","#34318A"],"pos":{"x":-4.92613615328446,"y":0}},{"vertexs":[{"x":3,"y":9},{"x":1,"y":9},{"x":1,"y":8},{"x":3,"y":8}],"numberEdges":4,"color":["#DB4437","#c82a23"],"pos":{"x":-4.805752871092409,"y":0}},{"vertexs":[{"x":3,"y":8},{"x":1,"y":8},{"x":1,"y":7},{"x":3,"y":7}],"numberEdges":4,"color":["#7E3794","#491F81"],"pos":{"x":5.492640750017017,"y":0}},{"vertexs":[{"x":3,"y":7},{"x":1,"y":7},{"x":1,"y":6},{"x":3,"y":6}],"numberEdges":4,"color":["#3F5CA9","#34318A"],"pos":{"x":-2.7753267721273005,"y":0}},{"vertexs":[{"x":2,"y":6},{"x":1,"y":6},{"x":1,"y":5},{"x":2,"y":5}],"numberEdges":4,"color":["#795548","#451F14"],"pos":{"x":-3.484142794739455,"y":0}},{"vertexs":[{"x":2,"y":5},{"x":1,"y":5},{"x":1,"y":4},{"x":2,"y":4}],"numberEdges":4,"color":["#F05722","#E3421E"],"pos":{"x":-2.4578227647580206,"y":0}},{"vertexs":[{"x":2,"y":4},{"x":1,"y":4},{"x":1,"y":3},{"x":2,"y":3}],"numberEdges":4,"color":["#4285F4","#355BD8"],"pos":{"x":-4.926261013373733,"y":0}},{"vertexs":[{"x":2,"y":3},{"x":1,"y":3},{"x":2,"y":2}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":-6.464052169583738,"y":0}}];

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

lvl24.prototype.step = function(){
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

iio.AppManager.prototype.activatelvl24 = function(io){
	this.level = new iio.lvl24(io);
	return this.level;
}

})();