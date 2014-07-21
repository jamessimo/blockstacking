
var currentLvl = null;
var canvasOffset = {
    x: 0,
    y: 0
}; 
var canvasZoom = {
    x: 1,
    y: 1
}; 

var mouseX, mouseY,touchX, touchY, mousePVec, isMouseDown, selectedBody, mouseJoint, jointEffect, clickedObjCenter,btn, pauseBtn, unPauseBtn,
menuTween, nextLvlBtn, restartLvlBtn;
var touches = [];
//load BOX2D classes
var   b2Vec2 = Box2D.Common.Math.b2Vec2
,  	b2BodyDef = Box2D.Dynamics.b2BodyDef
,  	b2Body = Box2D.Dynamics.b2Body
,  	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
,  	b2World = Box2D.Dynamics.b2World
,  	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
,  	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
,	b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
,   b2RopeJointDef = Box2D.Dynamics.Joints.b2RopeJointDef
,   b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
,	b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint
,	b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
,   b2DebugDraw = Box2D.Dynamics.b2DebugDraw
,   b2Fixture = Box2D.Dynamics.b2Fixture
,	b2Listener = Box2D.Dynamics.b2ContactListener
,	b2WorldManifold = Box2D.Collision.b2WorldManifold
,   b2AABB = Box2D.Collision.b2AABB;

colors = [

'#DB4437' ,
'#F05722' ,
'#E7981D' ,
'#F4DF3B' ,
'#CDDC39' ,
'#65B045' ,
'#11A9CC' ,
'#4285F4' ,
'#3F5CA9' ,
'#7E3794' ,
'#A61D4C' ,
'#795548' ,
'#F9F9F9' ,
'#4D4D4D'  

];



var PTM = 30;
var FPS = 60;
var world = new b2World(new b2Vec2(0, 30),true);
var listener = new b2Listener;
var level = null;

var gameOn = false;
var gameIntro = false;
var PIXEL_RATIO = 1;
var WORLD_SCALE = 1;
var GAMEHEIGHT = 480;
var GAMEWIDTH = 320;
var scaleX = scaleY = scaleToFit = 0;

var bgBlocks = 0;
var MAXBGBLOCKS = 35;

// 480;
// 853;

function GameControl(io) {

	PIXEL_RATIO = (function () {
	    var ctx = io.context,
	        dpr = window.devicePixelRatio || 1,
	        bsr = ctx.webkitBackingStorePixelRatio ||
	              ctx.mozBackingStorePixelRatio ||
	              ctx.msBackingStorePixelRatio ||
	              ctx.oBackingStorePixelRatio ||
	              ctx.backingStorePixelRatio || 1;
	
	    return dpr / bsr;
	})();
	
	this.onResize = function(event){
		io.canvas.width = GAMEWIDTH;
		io.canvas.height = GAMEHEIGHT;
		scaleX = io.canvas.width / window.innerWidth;
		scaleY = io.canvas.height / window.innerHeight;
		scaleToFit = Math.min(scaleX, scaleY);

		io.canvas.width = io.canvas.width*PIXEL_RATIO;
		io.canvas.height = io.canvas.height*PIXEL_RATIO;
		
		io.canvas.style.width = window.innerWidth + 'px';
		io.canvas.style.height = window.innerHeight + 'px';
	};
	
	//Debugging 
	//scaleX = scaleY = 1;
	PIXEL_RATIO = 1;
	
	io.canvas.width = GAMEWIDTH;
	io.canvas.height = GAMEHEIGHT;
	
	scaleX = io.canvas.width / window.innerWidth;
	scaleY = io.canvas.height / window.innerHeight;
	scaleToFit = Math.min(scaleX, scaleY);

	//DEBUGGING
	console.log('io.canvas W/H = ' + io.canvas.width+'/'+io.canvas.height);
	console.log('css canvas W/H = ' + io.canvas.style.width+'/'+io.canvas.style.height)
	console.log('screen W/H = ' +  window.innerWidth+'/'+window.innerHeight);
	console.log('scale X = ' +  scaleX +' Y = '+scaleY);
	console.log('pixel_ratio = ' + PIXEL_RATIO);
	
	 
	io.addB2World(world);
	/*var sound = new Howl({
		urls: ['music/FirstClassLounging.mp3']
	}).play();*/
	

	
	intro(io);
	//createWorld(io);
	
	io.canvas.width = io.canvas.width*PIXEL_RATIO;
	io.canvas.height = io.canvas.height*PIXEL_RATIO;
		
	io.canvas.style.width = window.innerWidth + 'px';
	io.canvas.style.height = window.innerHeight + 'px';
	
	
	
//	io.context.scale(0.6,0.6);
	io.context.translate(canvasOffset.x, canvasOffset.y);

	io.setB2Framerate(FPS, function(){
		if(gameOn){
			if(level.gameOver==true){
				gameOver(io);
			}
			else if(level.gameWin==true){
				winGame(io);
			}
			else if(level.pause==true){
				pause(io);
			}
			else{
				//io.context.scale(canvasZoom.x,canvasZoom.y);
				//io.context.translate(canvasOffset.x, canvasOffset.y);
				level.step();
				//create new shapes randomly
			}
		}else{
			if (gameIntro && bgBlocks < MAXBGBLOCKS && Math.random()<.03){
		        if (Math.random()<.5){
		        	createBlock(io);
		        	bgBlocks++;
		        }
		    }
		}
	

		if(isMouseDown && (!mouseJoint) && world) {
		  var body = getB2BodyAt(mouseX,mouseY);
		
		  if(body) {
		     var md = new b2MouseJointDef();
		     md.bodyA = world.GetGroundBody();
		     md.bodyB = body;
		     md.target.Set(mouseX, mouseY);
		     md.collideConnected = true;
		     md.maxForce = 600.0 * body.GetMass();
		     mouseJoint = world.CreateJoint(md);
		     
		     clickedObjCenter = md.bodyB.m_xf.position
		     
		     jointEffect = io.addToGroup('MOUSEJOINT', new iio.Circle(mouseX*PTM, mouseY*PTM,0).setFillStyle('rgba(255,255,255,0.2)'));
		     new TWEEN.Tween( {y: 0 } )
		     	.to( { x:pxConv(50)}, 1000 )
		     	.easing( TWEEN.Easing.Elastic.Out)
		     	.onUpdate( function () {
		     		jointEffect.radius = pxConv(this.x);;
		     	})
		     	.start();
		     
	
		     body.SetAwake(true);
		  }
		}
		if(mouseJoint) {
		  if(isMouseDown) {
		    mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
		     
		   	jointEffect.pos = new b2Vec2(mouseX*PTM, mouseY*PTM);
		   
		  } else {
		     world.DestroyJoint(mouseJoint);
		     io.rmvObj(mouseJoint);
		     io.rmvObj(jointEffect);
		     mouseJoint = null;
		     selectedBody = undefined;
		  }
		}
		TWEEN.update();
    });

	
    function getB2BodyAt(callback,v,y) {
    	if(world){
			if (typeof v.x =='undefined')
			  v=new Box2D.Common.Math.b2Vec2(v,y);
			mousePVec = new b2Vec2(mouseX, mouseY);
			var aabb = new b2AABB();
			aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
			aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
			selectedBody = null;
			world.QueryAABB(getBodyCB, aabb);
			return selectedBody;
       }
    }
    function getBodyCB(fixture) {
       if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
          if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
             selectedBody = fixture.GetBody();
             return false;
          }
       }
       return true;
    }
 
    function mouseDown(e){
       e.preventDefault();
       isMouseDown = true;
       mouseMove(e);
    }
    function touchStart(e){
       e.preventDefault();
       isMouseDown = true;
       touchMove(e);
    }
    function mouseUp(e){
       isMouseDown = false;
       mouseX = undefined;
       mouseY = undefined;
    }
    
    function touchEnd(e){
       isMouseDown = false;
       mouseX = undefined;
       mouseY = undefined;
    }
    
    function mouseMove(e){
      	mouseX = pxConv(io.getEventPosition(e).x*scaleX,true);
       	mouseY = pxConv(io.getEventPosition(e).y*scaleY,true); 
    }
    function touchMove(e){
    	mouseX = pxConv(e.touches[0].pageX*scaleX,true);
    	mouseY = pxConv(e.touches[0].pageY*scaleY,true);
    }
    //TOUCH EVENTS
	io.canvas.addEventListener('touchstart', function(e){
		touchStart(e);
		var newPos = io.getEventPosition(e);
		newPos.x = pxConv(e.touches[0].pageX)*scaleX;
		newPos.y = pxConv(e.touches[0].pageY)*scaleY;
		
		if (btn && btn.contains(newPos)){
			createWorld(io);
		}
		if(pauseBtn && pauseBtn.contains(newPos)){
			level.pause = true;
		}
		if(level){
			if(level.lvlButtons){
				for(var i = 1; i < level.lvlButtons.length ; i++){
					if(level.lvlButtons[i] && level.lvlButtons[i].contains(newPos)){
						createWorld(io,i);
						return false;
					}
				}
			}
		}
	
	});
	io.canvas.addEventListener('touchmove', touchMove);
	io.canvas.addEventListener('touchend', touchEnd);
	
	//DEBUGGING
	window.addEventListener('keydown', function(event){
		if (iio.keyCodeIs('up arrow', this.event)){
			if(level.gameEnd == true)
				level.gameEnd = false
			else 
				level.gameEnd = true
		
		}
		if (iio.keyCodeIs('g', this.event)){
			if(level.gameOver == true)
				level.gameOver = false
			else 
				level.gameOver = true
		}
		if (iio.keyCodeIs('w', this.event)){
			if(level.gameWin == true)
				level.gameWin = false
			else 
				level.gameWin = true
		}
		if (iio.keyCodeIs('r', this.event)){
			createWorld(io,currentLvl);
		}
		if (iio.keyCodeIs('l', this.event)){
			createWorld(io);
		}
		if (iio.keyCodeIs('p', this.event)){
			if(level.pause == true)
				resume(io);	
			else 
				pause(io);	
		}
		
	});
	//CLICK EVENTS
	io.canvas.addEventListener('mousemove', mouseMove);         
	io.canvas.addEventListener('mouseup', mouseUp);
	io.canvas.addEventListener('mousedown', function(e){
		mouseDown(e);
		 var newPos = io.getEventPosition(e);
		newPos.x = pxConv(io.getEventPosition(e).x)*scaleX;
		newPos.y = pxConv(io.getEventPosition(e).y)*scaleY;
        if (btn && btn.contains(newPos)){
        	createWorld(io);
        }
        if(pauseBtn && pauseBtn.contains(newPos)){
       		level.pause = true;	
        }
		if(unPauseBtn && unPauseBtn.contains(newPos)){
			resume(io);	
		}
		if(restartLvlBtn && restartLvlBtn.contains(newPos)){
			createWorld(io, currentLvl);
		}
		if(nextLvlBtn && nextLvlBtn.contains(newPos)){
			if(currentLvl <= 5)
				createWorld(io, currentLvl+1);
			else
				createWorld(io, currentLvl);
		}
		if(gameOn && level.lvlButtons){
			for(var i = 1; i < level.lvlButtons.length ; i++){
				if(level.lvlButtons[i] && level.lvlButtons[i].contains(newPos)){
					createWorld(io,i);
					return false;
				}
			}
		}
    });

    this.focusOff = function(e){
       mouseUp(e);
 	}
};

function pause(io){
		
	gameoverText = io.addToGroup('MENU',(new iio.Text('- PAUSED -',iio.Vec.add(io.canvas.width/2,io.canvas.height/2-pxConv(40),0,0)))
		.setFont(pxConv(60)+'px OpenSans')
		.setTextAlign('center')
		.setFillStyle('white'),20);

	unPauseBtn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, io.canvas.height/2, pxConv(160), pxConv(60))
		.setRoundingRadius(20)
		.setStrokeStyle('#4385f6').setLineWidth(2)
		.setFillStyle('#4385f6'),20);
		
	unPauseBtn.text = io.addToGroup('MENU', new iio.Text('resume',unPauseBtn.pos)
		.setFont(pxConv(30)+'px OpenSans')
		.translate(0,pxConv(9))
		.setTextAlign('center')
		.setFillStyle('white'),20);
		
		level.pause = true
		gameOn = false;
			
		io.pauseB2World(true);
		io.pauseFramerate(true);
}
function resume(io){

	gameoverText = null;

	io.rmvFromGroup('MENU');
	unPauseBtn = undefined; //To remove its POS
	io.pauseB2World(false);
	io.pauseFramerate(false);
	
	gameOn = false;
	level.pause = false;
	
	console.log('un pause game');
}


function winGame(io){
	gameOn = false;

	//SHOW WIN TEXT

	var gameoverText = io.addToGroup('MENU',(new iio.Text('Level ' + currentLvl + ' Clear!',iio.Vec.add(io.canvas.width/2,-pxConv(60),0,0)))
		.setFont(pxConv(40)+'px OpenSans')
		.setTextAlign('center')
		.setFillStyle('white'),20);
	  
	//SHOW NEXT LEVEL BUTTON      		      
	nextLvlBtn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, -100, pxConv(120), pxConv(40))
		.setRoundingRadius(10)
		.setStrokeStyle('#4385f6').setLineWidth(2)
		.setFillStyle('#4385f6'),20);
	nextLvlBtn.text = io.addToGroup('MENU', new iio.Text('Next Level',nextLvlBtn.pos)
		.setFont(pxConv(20)+'px OpenSans')
		.translate(0,pxConv(10))
		.setTextAlign('center')
		.setFillStyle('white'),20);
		
		
	var topCurtain = io.addToGroup('UIEFFECTS',(new iio.Rect(io.canvas.width/2,0,io.canvas.width,1))
		.setFillStyle('rgba(0,0,0,0.5)'),20);
		
	var bottomCurtain = io.addToGroup('UIEFFECTS',(new iio.Rect(io.canvas.width/2,io.canvas.height,io.canvas.width,1))
		.setFillStyle('rgba(0,0,0,0.5)'),20);
			
			
	new TWEEN.Tween( {y: 0 } )
		.to( { y:io.canvas.height}, 1000 )
		.easing( TWEEN.Easing.Bounce.Out)
		.onUpdate( function () {
			topCurtain.height = this.y;
			bottomCurtain.height = this.y;
			gameoverText.pos.y = this.y/2 - 20;
		} )
		.delay(1000)
		.start();
		
	new TWEEN.Tween( {y: io.canvas.height } )
		.to( { y:io.canvas.height/2}, 1000 )
		.easing( TWEEN.Easing.Bounce.Out)
		.onUpdate( function () {
			if(nextLvlBtn){
				nextLvlBtn.pos.y = this.y+50;
				nextLvlBtn.text.pos.y = this.y+50;
				nextLvlBtn.text.translate(0,pxConv(8));
			}
		} )
		.delay(1000)
		.start();

	io.pauseB2World(true);
	io.pauseFramerate(true);

}
function gameOver(io){
	gameOn = false;
	
	
	//SHOW GAME OVER TEXT
	var gameoverText = io.addToGroup('MENU',(new iio.Text('Game Over!',iio.Vec.add(io.canvas.width/2,-pxConv(60),0,0)))
		.setFont(pxConv(40)+'px OpenSans')
		.setTextAlign('center')
		.setFillStyle('white'),20);
	  
	//SHOW GAMEOVER BUTTON      		      
	restartLvlBtn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, -100, pxConv(120), pxConv(40))
		.setRoundingRadius(10)
		.setStrokeStyle('#4385f6').setLineWidth(2)
		.setFillStyle('#4385f6'),20);
	restartLvlBtn.text = io.addToGroup('MENU', new iio.Text('Restart',restartLvlBtn.pos)
		.setFont(pxConv(20)+'px OpenSans')
		.translate(0,pxConv(10))
		.setTextAlign('center')
		.setFillStyle('white'),20);
		
		
	var topCurtain = io.addToGroup('UIEFFECTS',(new iio.Rect(io.canvas.width/2,0,io.canvas.width,1))
		.setFillStyle('rgba(0,0,0,0.5)'),20);
		
	var bottomCurtain = io.addToGroup('UIEFFECTS',(new iio.Rect(io.canvas.width/2,io.canvas.height,io.canvas.width,1))
		.setFillStyle('rgba(0,0,0,0.5)'),20);
			
			
	new TWEEN.Tween( {y: 0 } )
		.to( { y:io.canvas.height}, 1000 )
		.easing( TWEEN.Easing.Bounce.Out)
		.onUpdate( function () {
			topCurtain.height = this.y;
			bottomCurtain.height = this.y;
			gameoverText.pos.y = this.y/2 - 20;
		} )
		.delay(1000)
		.start();
		
	new TWEEN.Tween( {y: io.canvas.height } )
		.to( { y:io.canvas.height/2}, 1000 )
		.easing( TWEEN.Easing.Bounce.Out)
		.onUpdate( function () {
			if(restartLvlBtn){
				restartLvlBtn.pos.y = this.y+50;
				restartLvlBtn.text.pos.y = this.y+50;
				restartLvlBtn.text.translate(0,pxConv(8));
			}
		} )
		.delay(1000)
		.start();

	io.pauseB2World(true);
	io.pauseFramerate(true);
}

function intro(io){
	

	io.setBGColor('#ccc');
	io.addToGroup('BACKGROUND',new iio.Rect(GAMEWIDTH/2,GAMEHEIGHT/2,GAMEWIDTH,GAMEHEIGHT).addImage('img/mountain.png'),-30);


	//SHOW LOGO
	var logo = io.addToGroup('MENU',(new iio.Text('Block Stacking!',iio.Vec.add(io.canvas.width,0,0,0)))
		.setFont(pxConv(30)+'px OpenSans')
		.setTextAlign('center')
		.setAlpha(0)
		.setFillStyle('white'),20);

	//SHOW START BUTTON      		      
	btn = io.addObj(new iio.Rect(io.canvas.width/2,io.canvas.height+pxConv(50), pxConv(100), pxConv(60))
	    .setRoundingRadius(pxConv(10))
	    .setStrokeStyle('#4385f6')
	    .setFillStyle('#4385f6')
	    );
	
	btn.text = io.addToGroup('MENU',new iio.Text('Start',btn.pos)
		.setFont(pxConv(20)+'px OpenSans')
		.translate(0,pxConv(9))
		.setTextAlign('center')
		.setFillStyle('white'),20);


	new TWEEN.Tween( { x: 0, y: io.canvas.height } )
		.to( { x: io.canvas.width/2,y: io.canvas.height/2}, 1000 )
		.easing( TWEEN.Easing.Elastic.Out)
		.onUpdate( function () {
			logo.pos.y = this.y;
			logo.pos.x = this.x;
			logo.styles.alpha = 1;
		} )
		.delay(1000)
		.start();
				
	new TWEEN.Tween( { x: 0, y: io.canvas.height})
		.to( { x: io.canvas.width/2,y: io.canvas.height/2 + 50}, 1000 )
		.easing( TWEEN.Easing.Bounce.Out)
		.onUpdate( function () {
			if(btn){
				btn.pos.y = this.y;
				btn.text.pos.y = this.y;
				btn.text.translate(0,pxConv(9));
			}
		} )
		.delay(2000)
		.onComplete(function(){gameIntro = true;})
		.start();



	var fixDef = new b2FixtureDef;
	fixDef.friction = 1;
	fixDef.restitution = 0.5;
	
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;
	

	//GROUND
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(GAMEWIDTH/2,true),pxConv(10,true));
	bodyDef.position.Set(pxConv(GAMEWIDTH/2,true),pxConv(GAMEHEIGHT,true));
	prepShape(io,bodyDef, fixDef).setFillStyle('blue');

	//BASIN WALLS
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(10,true),pxConv(GAMEHEIGHT/2,true));
	bodyDef.position.Set(pxConv(0 - 0,true),pxConv(GAMEHEIGHT/2,true));
	prepShape(io,bodyDef, fixDef).setFillStyle('blue');
	
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(10,true),pxConv(GAMEHEIGHT/2,true));
	bodyDef.position.Set(pxConv(GAMEWIDTH - 0,true),pxConv(GAMEHEIGHT/2,true));
	prepShape(io,bodyDef, fixDef).setFillStyle('blue');

}
function createWorld(io,levelNumber){
	gameOn = true;
	if ( world != null )
		world = null;
		
	io.rmvAll();
	btn = restartLvlBtn = nextLvlBtn = undefined;    
    //create the box2d world
	world = io.addB2World(new b2World(
    new b2Vec2(0, 30 * PIXEL_RATIO)    //gravity
   	,true                 //allow sleep
	));

	if(levelNumber){
		currentLvl = levelNumber;
		level = eval( "io.activateLevel"+levelNumber+"(io);" );
	}else{
		level = io.activateLevelSelect(io);
	}
	
	world.SetContactListener(listener);
	//console.log(level);
	if(level)
		level.setup();
	else
		level = null;
	
	gameIntro = false;
	//pause BUTTON
	
	
	/*.
	
	addImage('img/star.png').setImgSize(20,20),20);*/
	
	//console.log(level.lvlButtons[0]);
	io.pauseB2World(false);
	io.pauseFramerate(false);
	
	console.log('io.canvas W/H = ' + io.canvas.width+'/'+io.canvas.height);
	console.log('css canvas W/H = ' + io.canvas.style.width+'/'+io.canvas.style.height)
	console.log('screen W/H = ' +  window.innerWidth+'/'+window.innerHeight);
	console.log('scale X = ' +  scaleX +' Y = '+scaleY);
	console.log('pixel_ratio = ' + PIXEL_RATIO);
	
	
}

function prepShape(io,bodyDef, fixDef,group,zIndex){
	if(!group){
		group = 'worldObj';
	}
	if(!zIndex){
		zIndex = 0;
	}

	return  io.addToGroup(group,world.CreateBody(bodyDef),zIndex)
	        .CreateFixture(fixDef)
	        .GetShape()
	        .prepGraphics(io.b2Scale); 
};

function pxConv(x,box2dconv){
	x = x * PIXEL_RATIO;
	if(box2dconv == true){
		x = x / PTM;
	}
	return x;
}

//create a block
function createBlock(io){
	var fixDef = new b2FixtureDef;
	fixDef = new b2FixtureDef;
	fixDef.friction = 0.3;
	fixDef.restitution = 0.3;
	fixDef.density = 5;
	height = iio.getRandomNum(.3,1.5);
	width = iio.getRandomNum(.2,1.5);
	var bodyDef = new b2BodyDef;
	bodyDef.angle = height;

	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;

	x = iio.getRandomNum(0, GAMEWIDTH);


	
	bodyDef.type = b2Body.b2_dynamicBody;
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(height, width);

	color = iio.getRandomNum(0,colors.length-1)
	color = Math.round(color)

	bodyDef.position.Set(pxConv(x,true),pxConv(-100,true));
	prepShape(io,bodyDef, fixDef).setFillStyle(colors[color]);
}
