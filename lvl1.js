(function(){

function lvl1(io){
	//CANVAS VARS
	this.io = io;
	this.cHeight = io.canvas.height;
	this.cWidth = io.canvas.width;
	this.imgPath = 'img/';
	this.loadResources = 0;
	this.totalResources = 5;
	   
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
	fixDef.shape.SetAsBox(pxConv(this.cWidth/2,true),pxConv(10,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - 10,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('blue');
	

	//BASIN WALLS
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(10,true),pxConv(250,true));
	bodyDef.position.Set(pxConv(0+10,true),pxConv(this.cHeight - 125,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('blue');
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(10,true),pxConv(250,true));
	bodyDef.position.Set(pxConv(this.cWidth - 10,true),pxConv(this.cHeight - 125,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('blue');
	
	
	//PLATFORM
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(this.cWidth/4,true),pxConv(10,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - (10 + 250),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('green');
	
	
	
	//SHAPES!
	
	fixDef = new b2FixtureDef;
	fixDef.friction = 0.3;
	fixDef.restitution = 0.5;
	fixDef.density = 5;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	
		//bodyDef.angle=1;
	
	
	fixDef.shape.SetAsBox(pxConv(30,true),pxConv(30,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - 30,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('yellow');
	
	fixDef.shape.SetAsBox(pxConv(30,true),pxConv(30,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - 30,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('yellow');
	
	
	fixDef.shape.SetAsBox(pxConv(60,true),pxConv(60,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - (60),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('orange');
	
	fixDef.shape.SetAsBox(pxConv(60,true),pxConv(45,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 + 60,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('red');
	
	
	fixDef.shape.SetAsBox(pxConv(60,true),pxConv(45,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 60,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('red');
	
	
	
	
	fixDef.shape.SetAsBox(pxConv(45,true),pxConv(45,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 45,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('darkorange');
	
	fixDef.shape.SetAsBox(pxConv(45,true),pxConv(80,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 80,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('darkred');
		
		fixDef.shape.SetAsBox(pxConv(60,true),pxConv(60,true));
		bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - (120),true));
		this.prepShape(bodyDef, fixDef).setFillStyle('orange');
		
}

lvl1.prototype.step = function(){
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