lol = function(lawl){



	lawl.io.addToGroup('BACKGROUND',new iio.Rect(pxConv(lawl.cWidth/2),pxConv(lawl.cHeight/2),pxConv(lawl.cWidth),pxConv(lawl.cHeight)).addImage(lawl.imgPath+'lvl1.png'),-30);

	GAMEAREA = lawl.io.addToGroup('GAMEAREA',new iio.Rect(pxConv(lawl.cWidth/2),pxConv(lawl.cHeight/2 - 20),pxConv(lawl.cWidth/2),pxConv(300))
		.setFillStyle('rgba(0,0,0,0.0)')
		,-20);

	lawl.goalPos = new iio.Vec(lawl.cWidth/2, GAMEAREA.pos.y-(GAMEAREA.height/2));
	lawl.platformPos = new iio.Vec(lawl.cWidth/2, GAMEAREA.pos.y+(GAMEAREA.height/2));

	var fixDef = new b2FixtureDef;
	fixDef.friction = 1;
	fixDef.restitution = 0.5;
	
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	
	//GROUND
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(lawl.cWidth/2,true),pxConv(1,true));
	bodyDef.position.Set(pxConv(lawl.cWidth/2,true),pxConv(lawl.cHeight,true));
	prepShape(bodyDef, fixDef);

	//BASIN WALLS
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(1,true),pxConv(150/2,true));
	bodyDef.position.Set(pxConv(0 - 0,true),pxConv(lawl.cHeight - 75,true));
	prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(1,true),pxConv(150/2,true));
	bodyDef.position.Set(pxConv(lawl.cWidth - 0,true),pxConv(lawl.cHeight - 75,true));
	prepShape(bodyDef, fixDef);
	
	//WORLD BOUNDRIES
	fixDef.friction = 0;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(200,true));
	bodyDef.angle=-Math.PI/6;
	bodyDef.position.Set(pxConv(0 - 100,true),pxConv(lawl.cHeight - 320,true));
	prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(200,true));
	bodyDef.angle=Math.PI/6;
	bodyDef.position.Set(pxConv(lawl.cWidth + 100,true),pxConv(lawl.cHeight - 320,true));
	prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(210,true));
	bodyDef.angle=-Math.PI/3;
	bodyDef.position.Set(pxConv(lawl.cWidth + 30,true),pxConv(-110,true));
	prepShape(bodyDef, fixDef);
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(210,true));
	bodyDef.angle=Math.PI/3;
	bodyDef.position.Set(pxConv(-30,true),pxConv(-110,true));
	prepShape(bodyDef, fixDef);
	

	fixDef.friction = 1;

	//PLATFORM

	bodyDef.angle = 0;
	bodyDef.type = b2Body.b2_staticBody;
	bodyDef.position.Set(pxConv(lawl.platformPos.x,true),pxConv(lawl.platformPos.y/PIXEL_RATIO,true));	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(lawl.cWidth/5.1,true),pxConv(5,true));
	prepShape(bodyDef, fixDef).setFillStyle(colors['brown'][0]);


	//GOAL
	bodyDef.type = b2Body.b2_staticBody;
	fixDef.isSensor = true;
	fixDef.userData = 'goal';
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(62/2,true),pxConv(59/2,true));
	bodyDef.position.Set(pxConv(lawl.goalPos.x,true), pxConv(lawl.goalPos.y/PIXEL_RATIO,true));
	lawl.goalEffect = lawl.io.addToGroup('GOALEFFECTS', new iio.Circle(pxConv(lawl.goalPos.x),pxConv(lawl.goalPos.y/PIXEL_RATIO),0).setFillStyle('rgba(255,255,255,0.4)'));
	prepShape(bodyDef, fixDef).addImage(lawl.imgPath + 'star.png')
	


}