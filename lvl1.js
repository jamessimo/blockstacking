(function(){

function lvl1(io){
	//CANVAS VARS
	this.io = io;
	this.cHeight = io.canvas.height;
	this.cWidth = io.canvas.width;
	this.imgPath = 'img/';
	this.loadResources = 0;
	this.totalResources = 5;
	
	//GAME VARS
	this.MIN_SIZE = 25/2;
	this.MAX_SIZE = 45/2;
	this.goal =
	this.goalTouch =
	this.goalEffect = undefined;
	this.goalTime = 150;
	this.goalTouchTime = 0;
	this.gameWin = 
	this.gameEnd = false;

	this.GAMEAREA;

	   
}; iio.lvl1 = lvl1;

lvl1.prototype.setup = function(){

	this.io.addToGroup('BACKGROUND',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2),pxConv(this.cWidth),pxConv(this.cHeight)).addImage(this.imgPath+'lvl1.png'),-30);
	


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
	this.prepShape(bodyDef, fixDef);
	

	//BASIN WALLS
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(1,true),pxConv(150/2,true));
	bodyDef.position.Set(pxConv(0 - 0,true),pxConv(this.cHeight - 75,true));
	this.prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(1,true),pxConv(150/2,true));
	bodyDef.position.Set(pxConv(this.cWidth - 0,true),pxConv(this.cHeight - 75,true));
	this.prepShape(bodyDef, fixDef);
	
	//WORLD BOUNDRIES
	
	fixDef.friction = 0;
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(200,true));
	bodyDef.angle=-Math.PI/6;
	bodyDef.position.Set(pxConv(0 - 100,true),pxConv(this.cHeight - 320,true));
	this.prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(200,true));
	bodyDef.angle=Math.PI/6;
	bodyDef.position.Set(pxConv(this.cWidth + 100,true),pxConv(this.cHeight - 320,true));
	this.prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(210,true));
	bodyDef.angle=-Math.PI/3;
	bodyDef.position.Set(pxConv(this.cWidth + 30,true),pxConv(-110,true));
	this.prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(210,true));
	bodyDef.angle=Math.PI/3;
	bodyDef.position.Set(pxConv(-30,true),pxConv(-110,true));
	this.prepShape(bodyDef, fixDef);
	
	fixDef.friction = 1;
	bodyDef.angle = 0;

	//PLATFORM
	bodyDef.type = b2Body.b2_staticBody;
	bodyDef.position.Set(pxConv(this.platformPos.x,true),pxConv(this.platformPos.y/PIXEL_RATIO,true));	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(this.cWidth/5.1,true),pxConv(5,true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[11][0]);

	//GOAL
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.isSensor = true;
	fixDef.userData = 'goal';
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(62/2,true),pxConv(59/2,true));
	bodyDef.position.Set(pxConv(this.goalPos.x,true), pxConv(this.goalPos.y/PIXEL_RATIO,true));
	this.goalEffect = this.io.addToGroup('GOALEFFECTS', new iio.Circle(pxConv(this.goalPos.x),pxConv(this.goalPos.y/PIXEL_RATIO),0).setFillStyle('rgba(255,255,255,0.4)'));
	this.prepShape(bodyDef, fixDef).addImage(this.imgPath + 'star.png')
	

	
	//SHAPES!
	fixDef = new b2FixtureDef;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.3;
	fixDef.density = 5;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE*1.5,true),pxConv(this.MAX_SIZE*1.5,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 ,true),pxConv(this.cHeight/2 ,true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[9][0]).setStrokeStyle(colors[9][1],pxConv(2));

	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE*1.5,true),pxConv(this.MAX_SIZE*1.5,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 + 60,true),pxConv(this.cHeight - this.MAX_SIZE,true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[1][0]).setStrokeStyle(colors[1][1],pxConv(2));
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(45,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 80,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[5][0]).setStrokeStyle(colors[5][1],pxConv(2));

	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE*1.1,true),pxConv(this.MAX_SIZE*1.1,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - this.MAX_SIZE,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[10][0]).setStrokeStyle(colors[10][1],pxConv(2));

	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MAX_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - this.MAX_SIZE,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[6][0]).setStrokeStyle(colors[6][1],pxConv(2));
	
	fixDef.shape.SetAsBox(pxConv(35,true),pxConv(this.MAX_SIZE*1.1,true));
	bodyDef.angle = -0.5;
	bodyDef.position.Set(pxConv(this.cWidth/2 - 80,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[8][0]).setStrokeStyle(colors[8][1],pxConv(2));
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MAX_SIZE,true));
	bodyDef.angle = 0;
	bodyDef.position.Set(pxConv(this.cWidth/2 + this.MAX_SIZE,true),pxConv(this.cHeight - (this.MAX_SIZE),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[4][0]).setStrokeStyle(colors[4][1],pxConv(2));  

}//SETUP

lvl1.prototype.step = function(){
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
lvl1.prototype.prepShape = function(bodyDef, fixDef,group,zIndex){
	if(!group){
		group = 'worldObj';
	}
	if(!zIndex){
		zIndex = 0;
	}
	
	return  this.io.addToGroup(group,world.CreateBody(bodyDef),zIndex)
	        .CreateFixture(fixDef)
	        .GetShape()
	        .prepGraphics(this.io.b2Scale); 
};

iio.AppManager.prototype.activateLevel1 = function(io){
	this.level = new iio.lvl1(io);
	return this.level;
}

})();