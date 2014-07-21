(function(){

function lvl1(io){
	//CANVAS VARS
	this.io = io;
	this.cHeight = io.canvas.height;
	this.cWidth = io.canvas.width;
	this.imgPath = 'img/';
	this.loadResources = 0;
	this.totalResources = 5;
	
	//COLOR PALLET
	this.red = '#DB4437';
	this.sunset = '#F05722';
	this.orange = '#E7981D';
	this.yellow = '#F4DF3B';
	this.lime = '#CDDC39';
	this.green = '#65B045';
	this.turquoise = '#11A9CC';
	this.blue = '#4285F4';
	this.navy = '#3F5CA9';
	this.purple = '#7E3794';
	this.burgundy = '#A61D4C';
	this.brown = '#795548';
	this.white = '#F9F9F9';
	this.black = '#4D4D4D';
	this.grey = '#CCCCCC';

	//GAME VARS
	this.MIN_SIZE = 25/2;
	this.MAX_SIZE = 45/2;
	this.goal =
	this.goalTouch =
	this.goalEffect = undefined;
	this.goalTime = 150;
	this.goalTouchTime = 0;
	
	this.platform = undefined;
	this.platformBodyDef = new b2BodyDef;
	this.platformFixDef = new b2FixtureDef;
	
	this.gameEnd = false;
	   
}; iio.lvl1 = lvl1;

lvl1.prototype.setup = function(){

	this.io.addToGroup('BACKGROUND',new iio.Rect(this.cWidth/2,this.cHeight/2,this.cWidth,this.cHeight).addImage(this.imgPath+'lvl1.png'),-30);
	
	
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
	bodyDef.angle=Math.PI/3;
	bodyDef.position.Set(pxConv(-30,true),pxConv(-110,true));
	this.prepShape(bodyDef, fixDef).setFillStyle('yellow');
	
	fixDef.friction = 1;
	bodyDef.angle = 0;

	//PLATFORM
	
	this.platformBodyDef.type = b2Body.b2_kinematicBody;
	this.platformFixDef.shape = new b2PolygonShape;
	this.platformFixDef.shape.SetAsBox(pxConv(this.cWidth/5,true),pxConv(5,true));

	this.platformBodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - (10 + 100),true));	
	
	this.platform = this.io.addObj(world.CreateBody(this.platformBodyDef)).CreateFixture(this.platformFixDef);

	this.platform.GetShape().prepGraphics(this.io.b2Scale)
	     .setFillStyle('green');
	
	//GOAL
	fixDef.isSensor = true;
	fixDef.userData = 'goal';
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(62/2,true),pxConv(59/2,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(75,true));
	
	this.goalEffect = this.io.addToGroup('GOALEFFECTS', new iio.Circle(pxConv(this.cWidth/2),pxConv(75),0).setFillStyle('rgba(255,255,255,0.2)'));
	
	this.prepShape(bodyDef, fixDef).addImage(this.imgPath + 'star.png')
	

	
	//SHAPES!
	
	fixDef = new b2FixtureDef;
	fixDef.friction = 0.3;
	fixDef.restitution = 0.5;
	fixDef.density = 5;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	
	fixDef.shape.SetAsBox(pxConv(this.MIN_SIZE,true),pxConv(this.MIN_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - this.MIN_SIZE,true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.yellow);
	
	fixDef.shape.SetAsBox(pxConv(this.MIN_SIZE,true),pxConv(this.MIN_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - this.MIN_SIZE,true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.yellow);
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MAX_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight - this.MAX_SIZE,true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.orange);
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(45,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - this.MAX_SIZE,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.red);
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MIN_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 45,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.brown);
	
	fixDef.shape.SetAsBox(pxConv(45,true),pxConv(this.MAX_SIZE/2,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 80,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle(this.purple);
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MAX_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 + this.MAX_SIZE,true),pxConv(this.cHeight - (this.MAX_SIZE),true));
	/*this.prepShape(bodyDef, fixDef).setFillStyle('orange').setStrokeStyle('darkorange',6).setAlpha(0.5);*/
	
	
	this.io.addToGroup('BLOCKS',world.CreateBody(bodyDef),0)
	        .CreateFixture(fixDef)
	        .GetShape()
	        .prepGraphics(this.io.b2Scale).setFillStyle(this.sunset)
	        
	  

}//SETUP

lvl1.prototype.step = function(){
	var lio = this;
	
	if(this.gameEnd == true){
		
	//	console.log(lio.platform.GetBody());
		lio.platform.GetBody().SetAwake(true);
		
		//this.platform.GetBody().SetLinearVelocity(new b2Vec2(-5,-2));
		if(lio.platform.GetBody().m_xf.position.x < 5.2222){
			this.platform.GetBody().SetLinearVelocity(new b2Vec2(5,2));
			canvasOffset.x = -1;
				canvasOffset.y = 1;
				//canvasZoom.x = 1;
								this.io.context.translate(canvasOffset.x, canvasOffset.y);

		}else if (lio.platform.GetBody().m_xf.position.x > 5.3333) {
			this.platform.GetBody().SetLinearVelocity(new b2Vec2(-5,-2));
				canvasOffset.x = 1;
				//canvasZoom.x = +0.1;
				canvasOffset.y = -1;

				this.io.context.translate(canvasOffset.x, canvasOffset.y);

		}
		 
		
		//x: 5.333333333333333
		//y: 12.333333333333334
		
	}else {
		this.platform.GetBody().SetLinearVelocity(new b2Vec2(0,0));
		lio.platform.GetBody().SetPosition(new b2Vec2(5.4444,12.333))
			canvasOffset.x = canvasOffset.y = 0;
			this.io.context.translate(0, 0);
	}
	
	//	this.platform.GetBody().SetLinearVelocity(new b2Vec2(0,3));
	if(this.goalTouchTime >= this.goalTime){
		this.gameOver = true;
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