(function(){

function lvl11(io){
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
	   
}; iio.lvl11 = lvl11;

lvl11.prototype.setup = function(){

	this.io.addToGroup('BACKGROUND',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2),pxConv(this.cWidth),pxConv(this.cHeight)).addImage(this.imgPath+'lvl11.png'),-30);

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
	
	
	blocksList = [{"vertexs":[{"x":10.410666666666666,"y":14.70464767616192},{"x":10.410666666666666,"y":15.136431784107947},{"x":10.126222222222223,"y":15.64017991004498},{"x":9.52888888888889,"y":15.832083958020991},{"x":8.874666666666666,"y":15.856071964017993},{"x":8.419555555555556,"y":15.424287856071965},{"x":8.277333333333335,"y":14.680659670164918},{"x":8.704,"y":14.296851574212894},{"x":9.557333333333334,"y":13.841079460269865},{"x":10.154666666666667,"y":14.032983508245877}],"numberEdges":10,"color":["#CDDC39","#B9C246"],"pos":{"x":-2.2106920876540244,"y":0}},{"vertexs":[{"x":8.163555555555556,"y":14.680659670164918},{"x":8.163555555555556,"y":15.256371814092955},{"x":7.736888888888889,"y":15.760119940029986},{"x":6.968888888888889,"y":15.832083958020991},{"x":6.456888888888889,"y":15.16041979010495},{"x":6.456888888888889,"y":14.632683658170915},{"x":7.054222222222223,"y":14.200899550224888},{"x":7.736888888888889,"y":14.080959520239881}],"numberEdges":8,"color":["#795548","#451F14"],"pos":{"x":-1.1639575781300664,"y":0}},{"vertexs":[{"x":6.542222222222223,"y":15.784107946026987},{"x":4.010666666666667,"y":15.784107946026987},{"x":4.750222222222223,"y":15.136431784107947},{"x":6.058666666666667,"y":14.992503748125937}],"numberEdges":4,"color":["#E7981D","#E05C16"],"pos":{"x":5.344503089319915,"y":0}},{"vertexs":[{"x":6.144000000000001,"y":14.776611694152924},{"x":5.063111111111112,"y":14.70464767616192},{"x":4.494222222222223,"y":13.985007496251875},{"x":4.721777777777778,"y":13.193403298350827},{"x":5.461333333333333,"y":12.977511244377812},{"x":6.343111111111112,"y":13.26536731634183},{"x":6.741333333333333,"y":13.913043478260871},{"x":6.599111111111112,"y":14.344827586206897}],"numberEdges":8,"color":["#795548","#451F14"],"pos":{"x":6.4748749593272805,"y":0}},{"vertexs":[{"x":3.6124444444444443,"y":13.913043478260871},{"x":2.9297777777777783,"y":14.22488755622189},{"x":1.9342222222222223,"y":13.961019490254873},{"x":1.9342222222222223,"y":13.26536731634183},{"x":2.474666666666667,"y":12.833583208395803},{"x":3.1573333333333338,"y":12.833583208395803},{"x":3.6124444444444443,"y":13.24137931034483}],"numberEdges":7,"color":["#7E3794","#491F81"],"pos":{"x":-1.4002325464971364,"y":0}},{"vertexs":[{"x":2.7591111111111113,"y":15.664167916041979},{"x":0.3413333333333333,"y":15.664167916041979},{"x":0.3413333333333333,"y":15.256371814092955},{"x":2.7591111111111113,"y":15.232383808095953}],"numberEdges":4,"color":["#A61D4C","#720D37"],"pos":{"x":5.8711920022033155,"y":0}},{"vertexs":[{"x":2.7022222222222227,"y":14.896551724137932},{"x":0.45511111111111113,"y":14.992503748125937},{"x":0.45511111111111113,"y":14.344827586206897},{"x":2.616888888888889,"y":14.296851574212894}],"numberEdges":4,"color":["#F4DF3B","#EBC12C"],"pos":{"x":-4.855020139366388,"y":0}},{"vertexs":[{"x":2.8444444444444446,"y":14.656671664167918},{"x":0.48355555555555557,"y":14.70464767616192},{"x":0.48355555555555557,"y":13.961019490254873},{"x":2.7875555555555556,"y":13.913043478260871}],"numberEdges":4,"color":["#F4DF3B","#EBC12C"],"pos":{"x":0.15654698526486754,"y":0}},{"vertexs":[{"x":2.8444444444444446,"y":13.793103448275863},{"x":0.48355555555555557,"y":13.841079460269865},{"x":0.512,"y":13.385307346326838},{"x":2.616888888888889,"y":13.193403298350827}],"numberEdges":4,"color":["#65B045","#4F8742"],"pos":{"x":4.48756103310734,"y":0}}];

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

lvl11.prototype.step = function(){
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

iio.AppManager.prototype.activatelvl11 = function(io){
	this.level = new iio.lvl11(io);
	return this.level;
}

})();