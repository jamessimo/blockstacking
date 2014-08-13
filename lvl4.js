(function(){

function lvl4(io){
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
	   
}; iio.lvl4 = lvl4;

lvl4.prototype.setup = function(){

	this.io.addToGroup('BACKGROUND',new iio.Rect(this.cWidth/2,this.cHeight/2,this.cWidth,this.cHeight).addImage(this.imgPath+'lvl4.png'),-30);
	
	
	
	var fixDef = new b2FixtureDef;
	fixDef.friction = 1;
	fixDef.restitution = 0.5;
	
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	
	
	
	//GROUND
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(this.cWidth/2,true),pxConv(0,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('blue');
	

	//BASIN WALLS
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(150/2,true));
	bodyDef.position.Set(pxConv(0 - 0,true),pxConv(this.cHeight - 75,true));
	
	this.prepShape(bodyDef, fixDef).setFillStyle('blue');
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(150/2,true));
	bodyDef.position.Set(pxConv(this.cWidth - 0,true),pxConv(this.cHeight - 75,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('blue');
	
	//WORLD BOUNDRIES
	
	fixDef.friction = 0;
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(200,true));
	bodyDef.angle=-Math.PI/6;
	bodyDef.position.Set(pxConv(0 - 100,true),pxConv(this.cHeight - 320,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('red');
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(200,true));
	bodyDef.angle=Math.PI/6;
	bodyDef.position.Set(pxConv(this.cWidth + 100,true),pxConv(this.cHeight - 320,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('red');
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(210,true));
	bodyDef.angle=-Math.PI/3;
	bodyDef.position.Set(pxConv(this.cWidth + 30,true),pxConv(-110,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('yellow');
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(210,true));
	bodyDef.angle = Math.PI/3;
	bodyDef.position.Set(pxConv(-30,true),pxConv(-110,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('yellow');
	
	fixDef.friction = 1;
	bodyDef.angle = 0;


	//PLATFORM
		fixDef.friction = 1;

	bodyDef.type = b2Body.b2_staticBody;
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - (10 + 100),true));	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(this.cWidth/5.5,true),pxConv(5,true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[11][0]);
		
	//GOAL
	fixDef.isSensor = true;
	fixDef.userData = 'goal';
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(62/2,true),pxConv(59/2,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(75,true));
	
	this.goalEffect = this.io.addToGroup('GOALEFFECTS', new iio.Circle(pxConv(this.cWidth/2),pxConv(75),0).setFillStyle('rgba(255,255,255,0.4)'));
	
	this.prepShape(bodyDef, fixDef).addImage(this.imgPath + 'star.png')
	
	fixDef.isSensor = false;
	
	//SHAPES!
	
	fixDef = new b2FixtureDef;
	fixDef.friction = 0.3;
	fixDef.restitution = 0.5;
	fixDef.density = 5;

	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.userData = 'blocks';
	fixDef.shape = new b2PolygonShape;

	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MAX_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - this.MAX_SIZE,true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[2][0]).setStrokeStyle(colors[2][1],pxConv(2));
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(45,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - this.MAX_SIZE,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[3][0]).setStrokeStyle(colors[3][1],pxConv(2));
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MAX_SIZE/1.5,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 45,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[4][0]).setStrokeStyle(colors[4][1],pxConv(2));


	fixDef.shape.SetAsArray([
		new b2Vec2(pxConv(1.1), pxConv(0)), 
		new b2Vec2(pxConv(0.55), pxConv(0.95)), 
		new b2Vec2(pxConv(-0.55), pxConv(0.95)),
		new b2Vec2(pxConv(-1.1), pxConv(0)), 
		new b2Vec2(pxConv(-0.55), pxConv(-0.95)), 
		new b2Vec2(pxConv(0.55), pxConv(-0.95))
	]);
	bodyDef.position.Set(pxConv(this.cWidth/2 + this.MAX_SIZE,true),pxConv(this.cHeight - (this.MAX_SIZE),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[10][0]).setStrokeStyle(colors[10][1],2);   


	fixDef.shape.SetAsArray([
		new b2Vec2(pxConv(1.15), pxConv(0)), 
		new b2Vec2(pxConv(-0.57), pxConv(1)), 
		new b2Vec2(pxConv(-0.57), pxConv(-1))
	]);
	bodyDef.position.Set(pxConv(this.cWidth/2 + this.MAX_SIZE,true),pxConv(this.cHeight - (this.MAX_SIZE),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[9][0]).setStrokeStyle(colors[9][1],2); 


	fixDef.shape.SetAsArray([
		new b2Vec2(pxConv(1.15), pxConv(0)), 
		new b2Vec2(pxConv(-0.57), pxConv(1)), 
		new b2Vec2(pxConv(-0.57), pxConv(-1))
	]);
	bodyDef.position.Set(pxConv(this.cWidth/2 + this.MAX_SIZE,true),pxConv(this.cHeight - (this.MAX_SIZE),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(colors[1][0]).setStrokeStyle(colors[1][1],2);   


}//SETUP

lvl4.prototype.step = function(){
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
lvl4.prototype.prepShape = function(bodyDef, fixDef,group,zIndex){
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

iio.AppManager.prototype.activateLevel4 = function(io){
	this.level = new iio.lvl4(io);
	return this.level;
}

})();