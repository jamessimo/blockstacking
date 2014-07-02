(function(){

function lvl2(io){
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
	
	this.platform = undefined;
	this.platformBodyDef = new b2BodyDef;
	this.platformFixDef = new b2FixtureDef;
	

	this.water = [];

	this.waterObj = undefined;
	this.waterBodyDef = new b2BodyDef;
	this.waterFixDef = new b2FixtureDef;
	
	this.gameEnd = false;
	   
}; iio.lvl2 = lvl2;

lvl2.prototype.setup = function(){
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
   	//this.platform.GetBody().SetLinearVelocity(new b2Vec2(0,0));

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
	//bodyDef.setActive(true);
	console.log(bodyDef);
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.allowSleep = false;
	bodyDef.bullet = true;
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
	
	fixDef.shape.SetAsBox(pxConv(45,true),pxConv(this.MAX_SIZE/2,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 - 80,true),pxConv(this.cHeight - (45),true));
	this.prepShape(bodyDef, fixDef).setFillStyle('darkred');
	
	fixDef.shape.SetAsBox(pxConv(this.MAX_SIZE,true),pxConv(this.MAX_SIZE,true));
	bodyDef.position.Set(pxConv(this.cWidth/2 + this.MAX_SIZE,true),pxConv(this.cHeight - (this.MAX_SIZE),true));
	/*this.prepShape(bodyDef, fixDef).setFillStyle('orange').setStrokeStyle('darkorange',6).setAlpha(0.5);*/
	
	
	this.io.addToGroup('BLOCKS',world.CreateBody(bodyDef),0)
	        .CreateFixture(fixDef)
	        .GetShape()
	        .prepGraphics(this.io.b2Scale).setFillStyle('orange')
	        
	       
	        
	//WATER
	this.waterFixDef.isSensor = true;

	this.waterBodyDef.type = b2Body.b2_kinematicBody;
	this.waterBodyDef.allowSleep = false;

	this.waterFixDef.userData = 'water';

	this.waterFixDef.shape = new b2PolygonShape;
	this.waterFixDef.shape.SetAsBox(pxConv(this.cWidth/2,true),pxConv(100,true));

	this.waterBodyDef.position.Set(pxConv(this.cWidth/2,true),pxConv(this.cHeight+200,true));	
	
	this.waterObj = this.io.addObj(world.CreateBody(this.waterBodyDef)).CreateFixture(this.waterFixDef);

	this.waterObj.GetShape().prepGraphics(this.io.b2Scale)
	     .setFillStyle('rgba(0,0,255,0.7)');
	

}//SETUP

lvl2.prototype.step = function(){
	var lio = this;
	
	if(this.gameEnd == true){
		//console.log(world);


	  var node = world.GetBodyList(); 
	  var i = 0;
		  while(node){
	 		var curr = node;
			node = node.GetNext();
			if(curr.GetType() == b2Body.b2_dynamicBody){
				if(curr.GetFixtureList().GetUserData() == 'blocks'){
					i++;
					curr.SetSleepingAllowed(false);
				}
			}
		}

		lio.waterObj.GetBody().SetSleepingAllowed(false);


		//world.m_gravity.y = -0.1;

		//lio.waterObj.GetBody().SetAwake(true);
			this.waterObj.GetBody().SetLinearVelocity(new b2Vec2(0,-2));
		//this.platform.GetBody().SetLinearVelocity(new b2Vec2(-5,-2));
		if(lio.waterObj.GetBody().m_xf.position.x > 10){
			this.waterObj.GetBody().SetLinearVelocity(new b2Vec2(0,0));
		}
		 
	
	}else {
		this.waterObj.GetBody().SetLinearVelocity(new b2Vec2(0,0));
		//lio.waterObj.GetBody().SetPosition(new b2Vec2(5.4444,12.333))
				world.m_gravity.y = 30;

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
	listener.PreSolve = function(contact){
		//console.log(contact)
		if(contact.GetFixtureA().GetShape().styles.fillStyle == 'darkred'){
			//lio.water.push(contact.GetFixtureA().GetBody());
			//console.log(contact);
			//console.log(contact.GetFixtureB().GetUserData());
			if(contact.GetFixtureB().GetUserData() == 'water'){
				//console.log('pre touched block ' + contact.GetFixtureB().GetShape().styles.fillStyle);
			}
		}
	}
	listener.BeginContact = function(contact) {
		if(contact.GetFixtureB().GetUserData() == 'goal'){
			lio.goalTouch = contact.GetFixtureA();
			lio.goal = contact.GetFixtureB();
		}
		
		if(contact.GetFixtureB().GetUserData() == 'water'){
			lio.water.push(contact.GetFixtureA().GetBody());
			console.log(contact.GetFixtureA().GetShape().styles.fillStyle);
			console.log('touched block ' + contact.GetFixtureA().GetShape().styles.fillStyle);
		}
			
	}
	listener.EndContact = function(contact) {
		if(contact.GetFixtureB().GetUserData() == 'goal'){
			lio.goalTouchTime = 0; 
			lio.goalTouch = undefined;
			lio.goalEffect.radius = 0;
		}
		
		if(contact.GetFixtureB().GetUserData() == 'water'){
			var i = lio.water.indexOf(contact.GetFixtureA().GetBody());
			if(i != -1) {
				lio.water.splice(i, 1);
			}
		}
	}
	
	//WATER
	if(lio.water.length){
		for (var i = 0, l = lio.water.length; i < l; ++i) {
						
			if(lio.water[i]){
				var setCenter = b2Vec2(0,0);
				//console.log(lio.water[i].GetFixtureList());
				//console.log(lio.water[i].GetMass());
				setCenter = lio.water[i].GetWorldCenter();
				lio.water[i].SetAwake(true);
				lio.water[i].ApplyImpulse(new b2Vec2(0,-Math.abs(lio.water[i].GetMass() / 1.95)),lio.water[i].GetWorldCenter());
			}
			
			//return false;
			//lio.water[i].SetLinearVelocity(new b2Vec2(0,-3));
		}
	}
	
}//STEP
lvl2.prototype.prepShape = function(bodyDef, fixDef,group,zIndex){
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

iio.AppManager.prototype.activateLevel2 = function(io){
	this.level = new iio.lvl2(io);
	return this.level;
}

})();