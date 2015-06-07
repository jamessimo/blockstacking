(function(){

function lvl18(io){
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
	   
}; iio.lvl18 = lvl18;

lvl18.prototype.setup = function(){

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
	
	
	blocksList = [{"vertexs":[{"x":10,"y":15},{"x":10,"y":16},{"x":9,"y":16}],"numberEdges":3,"color":["#DB4437","#c82a23"],"pos":{"x":-3.7710872879251838,"y":0}},{"vertexs":[{"x":10,"y":14},{"x":9,"y":15},{"x":9,"y":14}],"numberEdges":3,"color":["#65B045","#4F8742"],"pos":{"x":-5.337372406385839,"y":0}},{"vertexs":[{"x":9,"y":14},{"x":9,"y":15},{"x":8,"y":15}],"numberEdges":3,"color":["#F05722","#E3421E"],"pos":{"x":1.5310926283709705,"y":0}},{"vertexs":[{"x":8,"y":15},{"x":7,"y":15},{"x":8,"y":14}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":5.788443483877927,"y":0}},{"vertexs":[{"x":8,"y":14},{"x":7,"y":15},{"x":7,"y":14}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":-2.6268735858611763,"y":0}},{"vertexs":[{"x":7,"y":15},{"x":6,"y":15},{"x":6,"y":14}],"numberEdges":3,"color":["#F05722","#E3421E"],"pos":{"x":-6.354688024148345,"y":0}},{"vertexs":[{"x":6,"y":14},{"x":5,"y":15},{"x":5,"y":14}],"numberEdges":3,"color":["#795548","#451F14"],"pos":{"x":-3.5388546278700233,"y":0}},{"vertexs":[{"x":6,"y":14},{"x":5,"y":15},{"x":5,"y":14}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":4.432527526747435,"y":0}},{"vertexs":[{"x":5,"y":14},{"x":4,"y":15},{"x":4,"y":14}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":2.790998543612659,"y":0}},{"vertexs":[{"x":6,"y":15},{"x":5,"y":15},{"x":6,"y":14}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":6.860954067204148,"y":0}},{"vertexs":[{"x":3,"y":14},{"x":3,"y":15},{"x":2,"y":15}],"numberEdges":3,"color":["#F05722","#E3421E"],"pos":{"x":-3.8550641485489905,"y":0}},{"vertexs":[{"x":3,"y":14},{"x":2,"y":15},{"x":2,"y":14}],"numberEdges":3,"color":["#4D4D4D","#151515"],"pos":{"x":-1.331401688978076,"y":0}},{"vertexs":[{"x":2,"y":14},{"x":2,"y":15},{"x":1,"y":15}],"numberEdges":3,"color":["#11A9CC","#1B7DB1"],"pos":{"x":4.62044172314927,"y":0}},{"vertexs":[{"x":2,"y":14},{"x":1,"y":15},{"x":1,"y":14}],"numberEdges":3,"color":["#CDDC39","#B9C246"],"pos":{"x":-1.3216117224656045,"y":0}},{"vertexs":[{"x":4,"y":14},{"x":3,"y":15},{"x":3,"y":14}],"numberEdges":3,"color":["#795548","#451F14"],"pos":{"x":-5.072187028825283,"y":0}},{"vertexs":[{"x":3,"y":13},{"x":2,"y":14},{"x":2,"y":13}],"numberEdges":3,"color":["#795548","#451F14"],"pos":{"x":-0.5015359465032816,"y":0}},{"vertexs":[{"x":3,"y":13},{"x":3,"y":14},{"x":2,"y":14}],"numberEdges":3,"color":["#F4DF3B","#EBC12C"],"pos":{"x":6.116835776716471,"y":0}},{"vertexs":[{"x":6,"y":13},{"x":6,"y":14},{"x":5,"y":14}],"numberEdges":3,"color":["#11A9CC","#1B7DB1"],"pos":{"x":-5.340043952688575,"y":0}},{"vertexs":[{"x":7,"y":13},{"x":7,"y":14},{"x":6,"y":14}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":-5.709018740803003,"y":0}},{"vertexs":[{"x":7,"y":13},{"x":6,"y":14},{"x":6,"y":13}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":-2.393278853967786,"y":0}},{"vertexs":[{"x":9,"y":14},{"x":9,"y":15},{"x":8,"y":15}],"numberEdges":3,"color":["#F4DF3B","#EBC12C"],"pos":{"x":4.039731122087687,"y":0}},{"vertexs":[{"x":2,"y":14},{"x":2,"y":15},{"x":1,"y":15}],"numberEdges":3,"color":["#11A9CC","#1B7DB1"],"pos":{"x":-4.676753685344011,"y":0}},{"vertexs":[{"x":2,"y":14},{"x":1,"y":15},{"x":1,"y":14}],"numberEdges":3,"color":["#DB4437","#c82a23"],"pos":{"x":6.753075315151364,"y":0}},{"vertexs":[{"x":1,"y":15},{"x":1,"y":16},{"x":0,"y":16}],"numberEdges":3,"color":["#4D4D4D","#151515"],"pos":{"x":4.377516084816307,"y":0}},{"vertexs":[{"x":1,"y":15},{"x":0,"y":16},{"x":0,"y":15}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":6.047792010009289,"y":0}},{"vertexs":[{"x":1,"y":14},{"x":1,"y":15},{"x":0,"y":15}],"numberEdges":3,"color":["#7E3794","#491F81"],"pos":{"x":-3.768914836458862,"y":0}},{"vertexs":[{"x":3,"y":13},{"x":3,"y":14},{"x":2,"y":14}],"numberEdges":3,"color":["#CDDC39","#B9C246"],"pos":{"x":1.3033272800967097,"y":0}},{"vertexs":[{"x":3,"y":13},{"x":2,"y":14},{"x":2,"y":13}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":-5.426589127164334,"y":0}},{"vertexs":[{"x":2,"y":13},{"x":2,"y":14},{"x":1,"y":14}],"numberEdges":3,"color":["#65B045","#4F8742"],"pos":{"x":-3.23960202652961,"y":0}},{"vertexs":[{"x":5,"y":13},{"x":5,"y":14},{"x":4,"y":14}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":0.7075655637308955,"y":0}},{"vertexs":[{"x":5,"y":14},{"x":4,"y":13},{"x":5,"y":13}],"numberEdges":3,"color":["#65B045","#4F8742"],"pos":{"x":-3.0239652264863253,"y":0}},{"vertexs":[{"x":10,"y":13},{"x":10,"y":14},{"x":9,"y":14}],"numberEdges":3,"color":["#4285F4","#355BD8"],"pos":{"x":1.0207472117617726,"y":0}},{"vertexs":[{"x":8,"y":13},{"x":8,"y":14},{"x":7,"y":14}],"numberEdges":3,"color":["#3F5CA9","#34318A"],"pos":{"x":0.5366080682724714,"y":0}},{"vertexs":[{"x":8,"y":13},{"x":8,"y":14},{"x":7,"y":14},{"x":7,"y":13}],"numberEdges":4,"color":["#4D4D4D","#151515"],"pos":{"x":-5.554228187073022,"y":0}}];

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

lvl18.prototype.step = function(){
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

iio.AppManager.prototype.activatelvl18 = function(io){
	this.level = new iio.lvl18(io);
	return this.level;
}

})();