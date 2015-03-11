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
	this.goal =
	this.goalTouch =
	this.goalEffect = undefined;
	this.goalTime = 150;
	this.goalTouchTime = 0;
	this.gameWin = 
	this.gameWinAnim =
	this.gameEnd = false;
	   
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

	this.goalEffect = this.io.addToGroup('GOALEFFECTS', new iio.Circle(pxConv(this.goalPos.x),pxConv(this.goalPos.y/PIXEL_RATIO),0).setFillStyle('rgba(244, 223, 59,0.3)').setStrokeStyle('rgba(233, 195, 53,0.3)',pxConv(2)));
		
	bodyDef.angle = Math.PI/1;
	fixDef.shape.SetAsArray([
			new b2Vec2(pxConv(0.94), pxConv(0.30)), 
			new b2Vec2(pxConv(0.34), pxConv(0.47)), 
			new b2Vec2(pxConv(-0.00), pxConv(0.99)), 
			new b2Vec2(pxConv(-0.34), pxConv(0.47)),
	
			new b2Vec2(pxConv(-0.94), pxConv(0.30)),
			new b2Vec2(pxConv(-0.56), pxConv(-0.18)),
			new b2Vec2(pxConv(-0.58), pxConv(-0.80)),
			new b2Vec2(pxConv(0.00), pxConv(-0.59)),
	
			new b2Vec2(pxConv(0.58), pxConv(-0.80)),
			new b2Vec2(pxConv(0.56), pxConv(-0.18))
		]);
		bodyDef.position.Set(pxConv(this.goalPos.x,true), pxConv(this.goalPos.y/PIXEL_RATIO,true));
		prepShape(bodyDef, fixDef).setFillStyle(colors['orange'][0]).setStrokeStyle(colors['orange'][1],pxConv(2));   
	
	

	//SHAPES!
	fixDef = new b2FixtureDef;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.3;
	fixDef.density = 5;
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	
	fixDef.shape.SetAsBox(pxConv(1),pxConv(1));
	bodyDef.position.Set(pxConv(this.cWidth/2 ,true),pxConv(this.cHeight/2 ,true));
	prepShape(bodyDef, fixDef).setFillStyle(colors['navy'][0]).setStrokeStyle(colors['navy'][1],pxConv(2));

	fixDef.shape.SetAsBox(pxConv(0.7),pxConv(0.7));
	bodyDef.position.Set(pxConv(this.cWidth/2 + (2 * PTM) ,true),pxConv(this.cHeight - (1 * PTM) ,true));
	prepShape(bodyDef, fixDef).setFillStyle(colors['sunset'][0]).setStrokeStyle(colors['sunset'][1],pxConv(2));
	
	fixDef.shape.SetAsBox(pxConv(0.8),pxConv(1.5));
	bodyDef.position.Set(pxConv(this.cWidth/2 + (4 * PTM),true),pxConv(this.cHeight - (45),true));
	prepShape(bodyDef, fixDef).setFillStyle(colors['blue'][0]).setStrokeStyle(colors['blue'][1],pxConv(2));

	fixDef.shape.SetAsBox(pxConv(0.8),pxConv(0.8));
	bodyDef.position.Set(pxConv(this.cWidth/2 - (25),true),pxConv(this.cHeight - (45),true));
	prepShape(bodyDef, fixDef).setFillStyle(colors['red'][0]).setStrokeStyle(colors['red'][1],pxConv(2));
	
	fixDef.shape.SetAsBox(pxConv(0.8),pxConv(1.2));
	bodyDef.angle = -0.5;
	bodyDef.position.Set(pxConv(this.cWidth/2 - (80),true),pxConv(this.cHeight - (45),true));
	prepShape(bodyDef, fixDef).setFillStyle(colors['turquoise'][0]).setStrokeStyle(colors['turquoise'][1],pxConv(2));
	
	fixDef.shape.SetAsBox(pxConv(1),pxConv(1));
	bodyDef.angle = 0;
	bodyDef.position.Set(pxConv(this.cWidth/2 + (25),true),pxConv(this.cHeight - (25),true));
	prepShape(bodyDef, fixDef).setFillStyle(colors['purple'][0]).setStrokeStyle(colors['purple'][1],pxConv(2));  





}//SETUP

lvl1.prototype.step = function(){
	var lio = this;
	
	if(this.gameEnd == true){
	}
	
	if(this.goalTouchTime >= this.goalTime){
		var fixDef = new b2FixtureDef;
		var bodyDef = new b2BodyDef;
		
		fixDef.friction = 0.5;
		fixDef.restitution = 0.3;
		fixDef.density = 5;
		bodyDef.type = b2Body.b2_dynamicBody;
		fixDef.shape = new b2PolygonShape;
		
		if(this.gameWinAnim == false){
			world.m_gravity.y = 0;
			for (var i=0; i<40; i++){
				fixDef.shape.SetAsBox(iio.getRandomNum(pxConv(0.05),pxConv(0.1)),iio.getRandomNum(pxConv(0.05),pxConv(0.1)));
				bodyDef.position.Set(pxConv(this.goalPos.x +iio.getRandomNum(-20,20) ,true),pxConv(this.goalPos.y/PIXEL_RATIO+iio.getRandomNum(-20,20),true));
				bodyDef.linearVelocity.Set(pxConv(iio.getRandomNum(-30,30)),pxConv(iio.getRandomNum(-30,30)));
				prepShape(bodyDef, fixDef).setFillStyle(colors['orange'][0]).setStrokeStyle(colors['orange'][1],pxConv(2));
			}
		}
		if(this.gameWinAnim){
			world.DestroyBody(lio.goal.GetBody());	 
		}
 
        this.gameWinAnim = true;
		setTimeout(function(){
		  lio.gameWin = true;
		}, 1000)
		
	}

	if(this.goalTouch){
		if(this.goalTouch.GetBody() != selectedBody && this.goalTouchTime <= this.goalTime){
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

iio.AppManager.prototype.activatelvl1 = function(io){
	this.level = new iio.lvl1(io);
	return this.level;
}

})();