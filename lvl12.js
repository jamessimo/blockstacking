(function(){

function lvl12(io){
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
	   
}; iio.lvl12 = lvl12;

lvl12.prototype.setup = function(){

	this.io.addToGroup('BACKGROUND',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2),pxConv(this.cWidth),pxConv(this.cHeight)).addImage(this.imgPath+'lvl12.png'),-30);

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
	
	
	blocksList =[{
	"vertexs": [{
		"x": 10.353777777777777,
		"y": 15.135135135135135
	}, {
		"x": 10.353777777777777,
		"y": 15.81081081081081
	}, {
		"x": 8.305777777777779,
		"y": 15.81081081081081
	}],
	"numberEdges": 3,
	"color": ["#F4DF3B", "#EBC12C"],
	"pos": {
		"x": 4.486681562382728,
		"y": 0
	}
}, {
	"vertexs": [{
		"x": 8.220444444444444,
		"y": 14.432432432432433
	}, {
		"x": 8.277333333333335,
		"y": 15.756756756756756
	}, {
		"x": 5.262222222222222,
		"y": 15.594594594594595
	}],
	"numberEdges": 3,
	"color": ["#F05722", "#E3421E"],
	"pos": {
		"x": 0.685232583899051,
		"y": 0
	}
}, {
	"vertexs": [{
		"x": 8.192,
		"y": 14.297297297297298
	}, {
		"x": 5.034666666666667,
		"y": 15.729729729729732
	}, {
		"x": 6.997333333333334,
		"y": 12.81081081081081
	}],
	"numberEdges": 3,
	"color": ["#CDDC39", "#B9C246"],
	"pos": {
		"x": 4.280850417446345,
		"y": 0
	}
}, {
	"vertexs": [{
		"x": 4.920888888888888,
		"y": 12.783783783783784
	}, {
		"x": 6.855111111111111,
		"y": 12.945945945945946
	}, {
		"x": 5.034666666666667,
		"y": 15.81081081081081
	}],
	"numberEdges": 3,
	"color": ["#E7981D", "#E05C16"],
	"pos": {
		"x": -4.582996298093349,
		"y": 0
	}
}, {
	"vertexs": [{
		"x": 4.778666666666667,
		"y": 14.972972972972974
	}, {
		"x": 4.721777777777778,
		"y": 15.864864864864867
	}, {
		"x": 3.015111111111111,
		"y": 15.864864864864867
	}],
	"numberEdges": 3,
	"color": ["#3F5CA9", "#34318A"],
	"pos": {
		"x": -1.2414904488250613,
		"y": 0
	}
}, {
	"vertexs": [{
		"x": 3.9253333333333336,
		"y": 12.945945945945946
	}, {
		"x": 4.66488888888889,
		"y": 14.432432432432433
	}, {
		"x": 2.1902222222222227,
		"y": 15.837837837837839
	}],
	"numberEdges": 3,
	"color": ["#F4DF3B", "#EBC12C"],
	"pos": {
		"x": -6.6829747636802495,
		"y": 0
	}
}, {
	"vertexs": [{
		"x": 3.2142222222222228,
		"y": 12.702702702702704
	}, {
		"x": 4.067555555555556,
		"y": 13.486486486486488
	}, {
		"x": 1.8204444444444445,
		"y": 15.783783783783784
	}, {
		"x": 1.0524444444444445,
		"y": 15.027027027027028
	}],
	"numberEdges": 4,
	"color": ["#CDDC39", "#B9C246"],
	"pos": {
		"x": -5.580115472897887,
		"y": 0
	}
}, {
	"vertexs": [{
		"x": 1.5360000000000003,
		"y": 12.972972972972974
	}, {
		"x": 2.5884444444444443,
		"y": 13.297297297297298
	}, {
		"x": 1.6213333333333333,
		"y": 15.756756756756756
	}, {
		"x": 0.8817777777777779,
		"y": 15.567567567567568
	}],
	"numberEdges": 4,
	"color": ["#11A9CC", "#1B7DB1"],
	"pos": {
		"x": -2.259526904206723,
		"y": 0
	}
}];
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

lvl12.prototype.step = function(){
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

iio.AppManager.prototype.activatelvl12 = function(io){
	this.level = new iio.lvl12(io);
	return this.level;
}

})();