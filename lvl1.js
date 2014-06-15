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
	this.MIN_SIZE = 25;
	this.MAX_SIZE = 45;
	this.goal =
	this.goalTouch =
	this.goalEffect = undefined;
	this.goalTime = 150;
	this.goalTouchTime = 0;
	
	
	   
}; iio.lvl1 = lvl1;

lvl1.prototype.setup = function(){
	this.io.setBGColor('black');
	
	
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
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(250,true));
	bodyDef.position.Set(pxConv(0 - 0,true),pxConv(this.cHeight - 125,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('blue');
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(250,true));
	bodyDef.position.Set(pxConv(this.cWidth - 0,true),pxConv(this.cHeight - 125,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('blue');
	
	
	//PLATFORM
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(this.cWidth/4,true),pxConv(10,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - (10 + 200),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('green');
	
	//GOAL
	fixDef.isSensor = true;
	fixDef.userData = 'goal';
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(62/1.5,true),pxConv(59/1.5,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(75,true));
	
	this.goalEffect = this.io.addToGroup('GOALEFFECTS', new iio.Circle(pxConv(this.cWidth/2),pxConv(75),0).setFillStyle('rgba(255,255,255,0.2)'));
	
	this.prepShape(bodyDef, fixDef).addImage(this.imgPath + 'star.png');

	
	//SHAPES!
	
	fixDef = new b2FixtureDef;
	fixDef.friction = 0.3;
	fixDef.restitution = 0.5;
	fixDef.density = 5;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	
	fixDef.shape.SetAsBox(pxConv(this.MIN_SIZE,true),pxConv(this.MIN_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - this.MIN_SIZE,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('yellow');
	
	fixDef.shape.SetAsBox(pxConv(this.MIN_SIZE,true),pxConv(this.MIN_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - this.MIN_SIZE,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('yellow');
	
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MAX_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - this.MAX_SIZE,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('orange');
	
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(45,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - this.MAX_SIZE,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('red');
	
	
	
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MIN_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 45,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('darkorange');
	
	fixDef.shape.SetAsBox(pxConv(45,true),pxConv(80,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 80,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('darkred');
		
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MAX_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 + this.MAX_SIZE,true),pxConv(this.cHeight - (this.MAX_SIZE),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('orange');
		
}
	
lvl1.prototype.step = function(){
	var lio = this;
	if(this.goalTouchTime >= this.goalTime){
		this.gameOver = true;
	}
	if(this.goalTouch){
		if(this.goalTouch.GetBody() != selectedBody){
			this.goalEffect.radius = this.goalTouchTime;
			this.goalTouchTime++;
		}else{
		
			this.goalEffect.radius = 0;
			this.goalTouchTime = 0; 
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
		
			if (lio.goalTouch == contact.GetFixtureA()){
				lio.goalTouch = undefined;
				lio.goalEffect.radius = 0;
			}
		}
	}
	
}
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