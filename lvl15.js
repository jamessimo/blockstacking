(function(){

function lvl15(io){
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
	   
}; iio.lvl15 = lvl15;

lvl15.prototype.setup = function(){

	this.io.addToGroup('BACKGROUND',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2),pxConv(this.cWidth),pxConv(this.cHeight)).addImage(this.imgPath+'lvl2.png'),-30);

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
	
	
	blocksList = [{"vertexs":[{"x":10.466666666666667,"y":14.8},{"x":10.466666666666667,"y":15.766666666666667},{"x":7.2,"y":15.7},{"x":7.2,"y":14.933333333333334}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":-6.323907852638513,"y":0}},{"vertexs":[{"x":10.133333333333333,"y":14.566666666666666},{"x":6.433333333333334,"y":15.033333333333333},{"x":9.866666666666667,"y":13.2}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":1.6066229557618499,"y":0}},{"vertexs":[{"x":9.933333333333334,"y":13.4},{"x":6.366666666666666,"y":15.033333333333333},{"x":6.4,"y":13.866666666666667}],"numberEdges":3,"color":["#DB4437","#c82a23"],"pos":{"x":4.911625725682825,"y":0}},{"vertexs":[{"x":6.866666666666666,"y":13.733333333333333},{"x":5.333333333333333,"y":13.933333333333334},{"x":5.166666666666667,"y":12.766666666666667},{"x":6.466666666666667,"y":12.566666666666666}],"numberEdges":4,"color":["#11A9CC","#1B7DB1"],"pos":{"x":4.433656694833189,"y":0}},{"vertexs":[{"x":4.7,"y":13},{"x":3.7,"y":15.033333333333333},{"x":3.066666666666667,"y":13.966666666666667},{"x":3.1,"y":12.7}],"numberEdges":4,"color":["#795548","#451F14"],"pos":{"x":-2.5393718471750617,"y":0}},{"vertexs":[{"x":3.2333333333333334,"y":13.1},{"x":1.5333333333333334,"y":14.966666666666667},{"x":0.7333333333333333,"y":13.933333333333334},{"x":2.533333333333333,"y":12.666666666666666}],"numberEdges":4,"color":["#3F5CA9","#34318A"],"pos":{"x":-3.212263201829046,"y":0}},{"vertexs":[{"x":2.533333333333333,"y":12.766666666666667},{"x":1.0666666666666667,"y":13.2},{"x":0.8,"y":12},{"x":1.9333333333333333,"y":11.6}],"numberEdges":4,"color":["#4D4D4D","#151515"],"pos":{"x":-6.7592192236334085,"y":0}},{"vertexs":[{"x":2.8666666666666667,"y":12.866666666666667},{"x":1.9333333333333333,"y":13.266666666666667},{"x":1.3666666666666667,"y":12.333333333333334},{"x":2.566666666666667,"y":12.033333333333333}],"numberEdges":4,"color":["#CDDC39","#B9C246"],"pos":{"x":5.197994842194021,"y":0}},{"vertexs":[{"x":6.933333333333334,"y":13.033333333333333},{"x":5.9,"y":13.933333333333334},{"x":5.233333333333333,"y":13.233333333333333},{"x":6.033333333333333,"y":12.6}],"numberEdges":4,"color":["#F4DF3B","#EBC12C"],"pos":{"x":0.00029913289472460747,"y":0}}];

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

lvl15.prototype.step = function(){
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

iio.AppManager.prototype.activatelvl15 = function(io){
	this.level = new iio.lvl15(io);
	return this.level;
}

})();