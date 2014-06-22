
var currentLvl = null;
var canvasOffset = {
    x: 0,
    y: 0
}; 

var mouseX, mouseY,touchX, touchY, mousePVec, isMouseDown, selectedBody, mouseJoint, jointEffect, clickedObjCenter,btn, pauseBtn, unPauseBtn,
menuTween;
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
,   b2DebugDraw = Box2D.Dynamics.b2DebugDraw
,   b2Fixture = Box2D.Dynamics.b2Fixture
,	b2Listener = Box2D.Dynamics.b2ContactListener
,	b2WorldManifold = Box2D.Collision.b2WorldManifold
,   b2AABB = Box2D.Collision.b2AABB;

var PTM = 30;
var FPS = 60;
var world = new b2World(new b2Vec2(0, 0),true);
var listener = new b2Listener;
var level = undefined;

var gameOn = false;
var PIXEL_RATIO = 1;
var WORLD_SCALE = 1;
var GAMEHEIGHT = 480;
var GAMEWIDTH = 320;

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
	//PIXEL_RATIO = 1;
	
	io.canvas.width = GAMEWIDTH;
		io.canvas.height = GAMEHEIGHT;
	
	var scaleX = io.canvas.width / window.innerWidth;
	var scaleY = io.canvas.height / window.innerHeight;
	var scaleToFit = Math.min(scaleX, scaleY);

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
	

	
	//intro(io);
	createWorld(io,1);
	
	io.canvas.width = io.canvas.width*PIXEL_RATIO;
	io.canvas.height = io.canvas.height*PIXEL_RATIO;
		
	io.canvas.style.width = window.innerWidth + 'px';
	io.canvas.style.height = window.innerHeight + 'px';
	
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
				level.step();
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
		     	.to( { x:90}, 1000 )
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
	
	});
	io.canvas.addEventListener('touchmove', touchMove);
	io.canvas.addEventListener('touchend', touchEnd);
	
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
		if(level.lvlButtons){
			for(var i = 1; i < level.lvlButtons.length ; i++){
				if(level.lvlButtons[i] && level.lvlButtons[i].contains(newPos)){
					//console.log(i);
					//console.log(level.lvlButtons[i]);
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
	io.addToGroup('MENU',(new iio.Text('WINNAR :)',iio.Vec.add(io.canvas.width/2,io.canvas.height/2,0,0)))
		.setFont(pxConv(60)+'px Courier New')
		.setTextAlign('center')
		.setFillStyle('yellow'),20);
		
	btn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, -100, pxConv(160), pxConv(60))
		.setRoundingRadius(20)
		.setStrokeStyle('#4385f6').setLineWidth(2)
		.setShadow('#386ad5',pxConv(2.5),pxConv(2.5),0)
		.setFillStyle('#4385f6'),20);
	btn.text = io.addToGroup('MENU', new iio.Text('Restart?',btn.pos)
		.setFont(pxConv(30)+'px OpenSans')
		.translate(0,pxConv(9))
		.setTextAlign('center')
		.setFillStyle('white'),20);
	
		
	io.pauseB2World(true);
	io.pauseFramerate(true);

}
function gameOver(io){
	gameOn = false;
	
	
	//SHOW GAME OVER TEXT
	var gameoverText = io.addToGroup('MENU',(new iio.Text('Game Over!',iio.Vec.add(io.canvas.width/2,-pxConv(40),0,0)))
		.setFont(pxConv(60)+'px OpenSans')
		.setTextAlign('center')
		.setShadow('rgb(150,150,150)',pxConv(2.5),pxConv(2.5),0)
		.setFillStyle('white'),20);
	  
	//SHOW GAMEOVER BUTTON      		      
	btn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, -100, pxConv(160), pxConv(60))
		.setRoundingRadius(20)
		.setStrokeStyle('#4385f6').setLineWidth(2)
		.setShadow('#386ad5',pxConv(2.5),pxConv(2.5),0)
		.setFillStyle('#4385f6'),20);
	btn.text = io.addToGroup('MENU', new iio.Text('Restart',btn.pos)
		.setFont(pxConv(30)+'px OpenSans')
		.translate(0,pxConv(9))
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
			gameoverText.pos.y = this.y/2 - 50;
		} )
		.delay(1000)
		.start();
		
	new TWEEN.Tween( {y: io.canvas.height } )
		.to( { y:io.canvas.height/2}, 1000 )
		.easing( TWEEN.Easing.Bounce.Out)
		.onUpdate( function () {
			if(btn){
				btn.pos.y = this.y+100;
				btn.text.pos.y = this.y+100;
				btn.text.translate(0,pxConv(9));
			}
		} )
		.delay(1000)
		.start();

	io.pauseB2World(true);
	io.pauseFramerate(true);
}

function intro(io){
	
	io.setBGColor('#ccc');

	//SHOW LOGO
	var logo = io.addToGroup('MENU',(new iio.Text('Block Stacking!',iio.Vec.add(io.canvas.width,0,0,0)))
		.setFont(pxConv(60)+'px OpenSans')
		.setTextAlign('center')
		.setAlpha(0)
		.setFillStyle('white'),20);

	//SHOW START BUTTON      		      
	btn = io.addObj(new iio.Rect(io.canvas.width/2,io.canvas.height+pxConv(100), pxConv(160), pxConv(60))
	    .setRoundingRadius(pxConv(20))
	    .setStrokeStyle('#4385f6')
	    .setFillStyle('#4385f6')
	    .setShadow('#386ad5',pxConv(2.5),pxConv(2.5),0)
	    );
	
	btn.text = io.addToGroup('MENU',new iio.Text('Start',btn.pos)
		.setFont(pxConv(30)+'px OpenSans')
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
		.to( { x: io.canvas.width/2,y: io.canvas.height/2 + 150}, 1000 )
		.easing( TWEEN.Easing.Bounce.Out)
		.onUpdate( function () {
			if(btn){
				btn.pos.y = this.y;
				btn.text.pos.y = this.y;
				btn.text.translate(0,pxConv(9));
			}
		} )
		.delay(2000)
		.start();
}
function createWorld(io,levelNumber){
	gameOn = true;
	if ( world != null )
		world = null;
		
	io.rmvAll();
	btn = undefined;    
    //create the box2d world
	world = io.addB2World(new b2World(
    new b2Vec2(0, 30)    //gravity
   	,true                 //allow sleep
	));
	
	if(levelNumber){
		level = eval( "io.activateLevel"+levelNumber+"(io);" );
	}else{
		level = io.activateLevelSelect(io);
	}
	
	world.SetContactListener(listener);
	
	level.setup();
	
	//pause BUTTON
	
	/*pauseBtn = io.addToGroup('PAUSE',new iio.Rect(pxConv(50),pxConv(50), pxConv(50), pxConv(50)).setFillStyle('#fff')).addObj(new iio.SimpleRect(pxConv(20),pxConv(20)).addImage('img/star.png').setImgSize(20,20));*/
	
	
	/*.
	
	addImage('img/star.png').setImgSize(20,20),20);*/
	
	//console.log(level.lvlButtons[0]);
	io.pauseB2World(false);
	io.pauseFramerate(false);
	
}

function pxConv(x,box2dconv){
	x = x * PIXEL_RATIO;
	if(box2dconv == true){
		x = x / PTM;
	}
	return x;
}
