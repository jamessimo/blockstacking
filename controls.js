
/*todotoday
Unmute
Finish  DONE
preloader
rocking star with tween DONE!
*/
var currentLvl = null;
var canvasOffset = {
    x: 0,
    y: 0
};
var canvasZoom = {
    x: 1,
    y: 1
};
var fullscreen1Params;
var sound = new Howl({ urls: ['music/Monkey-Island-Band.ogg'],loop: true });
var touchSound = new Howl({ urls: ['music/click.ogg'],loop: false,volume:0.8});
var smashSound = new Howl({ urls: ['music/smash.ogg'],loop: false,volume:0.5});
var tutorialTween;
var mouseX, mouseY,touchX, touchY, mousePVec, isMouseDown, selectedBody, mouseJoint, jointEffect, clickedObjCenter,startBtn, pauseBtn, unPauseBtn, menuBtn,testBtn,
menuTween, nextLvlBtn, restartLvlBtn,muteBtn, backBtn;
var touches = [];
//load BOX2D classes

var   b2Vec2 = Box2D.Common.Math.b2Vec2
,  	b2BodyDef = Box2D.Dynamics.b2BodyDef
,  	b2Body = Box2D.Dynamics.b2Body
,  	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
,  	b2World = Box2D.Dynamics.b2World
,  	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
,  	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
,	  b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
,   b2RopeJointDef = Box2D.Dynamics.Joints.b2RopeJointDef
,   b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
,	  b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint
,	  b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
,   b2DebugDraw = Box2D.Dynamics.b2DebugDraw
,   b2Fixture = Box2D.Dynamics.b2Fixture
,	  b2Listener = Box2D.Dynamics.b2ContactListener
,	  b2WorldManifold = Box2D.Collision.b2WorldManifold
,   b2AABB = Box2D.Collision.b2AABB;

var colors = new Array();

var newBlock = {};
var newBlocks = [];
var recordObjects = false;

var colors = {
	'red' 		: 	['#DB4437','#c82a23'],
	'sunset' 	: 	['#F05722','#E3421E'],
	'orange' 	: 	['#E7981D','#E05C16'],
	'yellow' 	: 	['#F4DF3B','#EBC12C'],
	'lime' 		: 	['#CDDC39','#B9C246'],
	'green' 	: 	['#65B045','#4F8742'],
	'turquoise' : 	['#11A9CC','#1B7DB1'],
	'blue' 		: 	['#4285F4','#355BD8'],
	'navy' 		: 	['#3F5CA9','#34318A'],
	'purple' 	: 	['#7E3794','#491F81'],
	'burgundy' 	: 	['#A61D4C','#720D37'],
	'brown' 	: 	['#795548','#451F14'],
	'black' 	: 	['#4D4D4D','#151515']
};
tempLvl = 5;
var TEST = false;

var PTM = 30;
var FPS = 60;
var world = new b2World(new b2Vec2(0, 30),true);
var listener = new b2Listener;
var level = null;

var adReady = false;

var gameOn = false;
var gameIntro = false;

var muted = false;
var PIXEL_RATIO = 1;
var WORLD_SCALE = 1;
var MAX_LEVELS = 24;

var GAMEHEIGHT = 480;
var GAMEWIDTH = 320;

var scaleX = scaleY = scaleToFit = 0;

var bgBlocks = 0;
var MAXBGBLOCKS = 35;

var loadResources = 0;

var bgMusicID = 0;

var lio = undefined;


function GameControl(io) {

	lio = io;

	if(window.innerHeight > 480){
		GAMEHEIGHT = 568;
	}


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


	if(PIXEL_RATIO > 1){
		PIXEL_RATIO = 1.5;
	}else{
		PIXEL_RATIO = 1;
	}


	if(TEST){
		PIXEL_RATIO = 1;
		GAMEHEIGHT = 480;
	  muted = true;
	}

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

	io.canvas.width = GAMEWIDTH;
	io.canvas.height = GAMEHEIGHT;

	scaleX = io.canvas.width / window.innerWidth;
	scaleY = io.canvas.height / window.innerHeight;
	scaleToFit = Math.min(scaleX, scaleY);

	localStorage["level.1"] = true;

	if(	localStorage["muted"] == 'true'){
		muted = true;
	}
	if(localStorage["muted"] == 'false' || !localStorage["muted"]) {
		sound.play();
		muted = false;
	}

intro(io);
//createWorld(io,tempLvl);

//endCredits(io);

  if(TEST && 1==2){

      io.context.scale(0.4,0.4);
    	io.context.translate(pxConv(250,false), pxConv(300,false));

  }

  var grid = new iio.Grid(0,0,GAMEWIDTH,GAMEHEIGHT,pxConv(PTM/2));
//  io.addObj(grid);

  if(CocoonJS.nativeExtensionObjectAvailable){
  fullscreen1Params = {
      "fullscreenAdUnit" : "f28daed244254154944ad407ba31ce99",
      "refresh" : 20
  };

  //PUT THIS INTO A PROMISE
  if(!adReady){
    console.log('loading ad');
    fullscreen1 = CocoonJS.Ad.createFullscreen(fullscreen1Params);
  }else{
    console.log('refreshing ad');
    fullscreen1.refreshFullScreen();
  }

    fullscreen1.onFullScreenShown.addEventListener(function()
    {
        console.log("fullscreen1 onFullScreenShown");
    });
    fullscreen1.onFullScreenHidden.addEventListener(function()
    {
        console.log("fullscreen1 onFullScreenHidden");
        fullscreen1.refreshFullScreen();
    });
    fullscreen1.onFullScreenReady.addEventListener(function()
    {
        adReady = true;
        console.log("fullscreen1 onFullScreenReady");
    });
}

/*io.setFramerate(20,function(){
		if(gameOn){
			if(level.gameOver==true){
				gameOver(io);
			}
			else if(level.gameWin==true){

				winGame(io);

			}
			else{
				//io.context.scale(canvasZoom.x,canvasZoom.y);
				//io.context.translate(canvasOffset.x, canvasOffset.y);
				level.step();


			}
		}else{
			if (gameIntro && bgBlocks < MAXBGBLOCKS && Math.random()<.03){
		        if (Math.random()<.5){
		        	createBlock(io);
		        	bgBlocks++;
		        }
		    }else if(level.gameWin==true){

		    }
		}
});*/



	io.setB2Framerate(FPS,function(){
		if(gameOn){
			if(level.gameOver==true){
				gameOver(io);
			}else if(level.gameWin==true){
				winGame(io);
			}else{
				//io.context.scale(canvasZoom.x,canvasZoom.y);
				//io.context.translate(canvasOffset.x, canvasOffset.y);
				level.step();
			}
		} else {
			if (gameIntro && bgBlocks < MAXBGBLOCKS && Math.random()<.03){
		        if (Math.random()<.5){
		        	createBlock(io);
		        	bgBlocks++;
		        }
		    }
		}

		if(isMouseDown && (!mouseJoint) && world) {
		  var body = getB2BodyAt(mouseX,mouseY);

		  if(body && !tutorialTween) {
		     var md = new b2MouseJointDef();
		     md.bodyA = world.GetGroundBody();
		     md.bodyB = body;
		     md.target.Set(mouseX, mouseY);
		     md.collideConnected = true;
		     md.maxForce = 600.0 * body.GetMass();
		     mouseJoint = world.CreateJoint(md);

         touchSound.play();
		     clickedObjCenter = md.bodyB.m_xf.position;

		     jointEffect = io.addToGroup('MOUSEJOINT', new iio.Circle(mouseX*PTM, mouseY*PTM,0).setFillStyle('rgba(255,255,255,0.4)'));
		     new TWEEN.Tween( {y: 0 } )
		     	.to( { x:pxConv(50)}, 1000 )
		     	.easing( TWEEN.Easing.Elastic.Out)
		     	.onUpdate( function () {
		     		jointEffect.radius = this.x;
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

    	if(recordObjects){

		//	console.log(+mouseX.toFixed(1));

			if(TEST){
				recMouseX = Math.round(mouseX * 2) / 2;
				recMouseY = Math.round(mouseY * 2) / 2;
        console.log(recMouseX);
			}
			else{
				recMouseX = mouseX;
				recMouseY = mouseY;//(+mouseY.toFixed(1));
			}
			io.addToGroup('EDITOREDGE', new iio.Circle(recMouseX*PTM, recMouseY*PTM,3).setFillStyle('rgba(255,255,255,1)'));

			newBlock.vertexs.push( new b2Vec2(recMouseX ,recMouseY));
    	}

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

     if (startBtn && startBtn.contains(newPos)){

       clearBtns();

       setTimeout(function(){
          createWorld(io);
       },100);

     }
     if(pauseBtn && pauseBtn.contains(newPos)){
        pause(io);
     }
    if(unPauseBtn && unPauseBtn.contains(newPos)){
      resume(io);
      clearBtns();
    }
    if(restartLvlBtn && restartLvlBtn.contains(newPos)){
      clearBtns();

          newPos = null;//Stop clicking though to level
      setTimeout(function(){
        createWorld(io, currentLvl);
      },0)

    }
    if(nextLvlBtn && nextLvlBtn.contains(newPos)){

      if(adReady && currentLvl % 2 === 0){
       fullscreen1.showFullScreen();
      }

      if(currentLvl <= MAX_LEVELS - 1)
        createWorld(io, currentLvl+1);
      else
        endCredits(io);
    }
    if(menuBtn && menuBtn.contains(newPos)){
      createWorld(io);
      clearBtns();

    }else{ //HAD TO IGNORE IF IN MENU
      if (gameOn && level.lvlButtons) {
         for(var i = 1; i < level.lvlButtons.length ; i++){
          if(level.lvlButtons[i] && level.lvlButtons[i].contains(newPos)){
            if(localStorage["level." + i] == "true"){
              createWorld(io,i);
            }
            return false;
          }
        }
      }
    }
    if(backBtn && backBtn.contains(newPos)){
      clearBtns();
      intro(io);
    }
    if(creditsBtn && creditsBtn.contains(newPos)){
      clearBtns();
      endCredits(io);
    }


    if(gameOn && level.backBtn){
      if(level.backBtn && level.backBtn.contains(newPos)){
        clearBtns();

        intro(io);
      }
    }
    if(muteBtn && muteBtn.contains(newPos)){
      soundControl();
    }

		if(testBtn && testBtn.contains(newPos)){
			if(adReady){
       fullscreen1.showFullScreen();
      }
		}
	});
	io.canvas.addEventListener('touchmove', touchMove);
	io.canvas.addEventListener('touchend', touchEnd);

	//DEBUGGING
	window.addEventListener('keydown', function(event){
		if (iio.keyCodeIs('up arrow', this.event)){
			if(level.gameEnd == true)
				level.gameEnd = false;
			else
				level.gameEnd = true;

		}

		if (iio.keyCodeIs('o', this.event)){
			if(recordObjects == true){
				newBlock.numberEdges = newBlock.vertexs.length;
				console.log(newBlock);

				var bodyDef = new b2BodyDef;

				var fixDef = new b2FixtureDef;
				fixDef.friction = 0.5;
				fixDef.restitution = 0.3;
				fixDef.density = 5;
				bodyDef.type = b2Body.b2_dynamicBody;
				fixDef.shape = new b2PolygonShape;

				fixDef.shape.SetAsArray(newBlock.vertexs);


				//console.log(fixDef);

				//console.log(fixDef.shape);
				var color = iio.getRandomNum(0,Object.keys(colors).length-1);
				color = Math.round(color)

				var currentColor = getColor(color);
				newBlock.color = currentColor;

				var xPos = iio.getRandomNum(-7,7);

				prepShape(bodyDef, fixDef).setFillStyle(currentColor[0]).setStrokeStyle(currentColor[1],2);


				newBlock.pos = new b2Vec2(xPos,0);


				newBlocks.push(newBlock);

				newBlock = {};
				recordObjects = false;
				io.rmvFromGroup('EDITOREDGE');
			}else{
				recordObjects = true;
				newBlock = {vertexs: [], numberEdges: 0}
			}
		}

		if (iio.keyCodeIs('k', this.event)){
			var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(newBlocks));
				window.open(url, '_blank');
				window.focus();
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
		if (iio.keyCodeIs('m', this.event)){
			if(muted == true){
				sound.play(function(id){
					bgMusicID = id;
				});
				muted =false;

			}else{
				sound.pause(bgMusicID);
				muted = true;
			}
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
    if (startBtn && startBtn.contains(newPos)){

      clearBtns();

      setTimeout(function(){
        	createWorld(io);
      },100);



    }
    if(pauseBtn && pauseBtn.contains(newPos)){
   		pause(io);
    }
		if(unPauseBtn && unPauseBtn.contains(newPos)){
			resume(io);
      clearBtns();

		}
		if(restartLvlBtn && restartLvlBtn.contains(newPos)){
      clearBtns();

      newPos = null;
      setTimeout(function(){
        createWorld(io, currentLvl);
      },10);

    }
		if(nextLvlBtn && nextLvlBtn.contains(newPos)){

      if(adReady){
       fullscreen1.showFullScreen();
      }

			if(currentLvl <= MAX_LEVELS - 1)
				createWorld(io, currentLvl+1);
			else
				endCredits(io);
		}
		if(menuBtn && menuBtn.contains(newPos)){
			createWorld(io);
      clearBtns();
		}else{ //HAD TO IGNORE IF IN MENU
			if (gameOn && level.lvlButtons) {
        for(var i = 1; i < level.lvlButtons.length ; i++){

  				if(level.lvlButtons[i] && level.lvlButtons[i].contains(newPos)){
  					if(localStorage["level." + i] == "true"){
  						createWorld(io,i);
  					}
  					return false;
  				}
  			}
  		}
		}

    if(backBtn && backBtn.contains(newPos)){
      clearBtns();
      intro(io);
    }
    if(creditsBtn && creditsBtn.contains(newPos)){
      clearBtns();
      endCredits(io);
    }

		if(gameOn && level.backBtn){
			if(level.backBtn && level.backBtn.contains(newPos)){
		    clearBtns();
				intro(io);
			}
		}
		if(muteBtn && muteBtn.contains(newPos)){
			soundControl();
		}

		if(testBtn && testBtn.contains(newPos)){

		  console.log(localStorage);
		  if(PIXEL_RATIO == 1.5)
		    	PIXEL_RATIO = 1;
			else
				PIXEL_RATIO = 1.5;
		    createWorld(io,currentLvl)
		}
    });

    this.focusOff = function(e){
       mouseUp(e);
 	}
};

function pause(io){

  if(tutorialTween){
    tutorialTween.stop();
  }
  if(level.tween){
    level.tween.stop();
  }


	//grey screen
	io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, io.canvas.height/2, io.canvas.width , io.canvas.height)
	.setFillStyle('rgba(0,0,0,0.7)'),20);

	unPauseBtn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, io.canvas.height/2 - pxConv(80), pxConv(60), pxConv(60))
		.setRoundingRadius(pxConv(2))
		.setFillStyle(colors['orange'][0])
		.setStrokeStyle(colors['orange'][1],pxConv(2)),20);

	unPauseBtn.addObj(new iio.Rect().addImage('img/nextBtn.png')
		.setImgSize(pxConv(50),pxConv(50)));

	pauseBtn.pos.x = pxConv(-50); //hide pause button;

	muteBtn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, io.canvas.height/2 + pxConv(60), pxConv(60), pxConv(60))
		.setRoundingRadius(pxConv(2))
		.setFillStyle(colors['orange'][0])
		.setStrokeStyle(colors['orange'][1],pxConv(2)),20);

	muteBtn.addObj(new iio.Rect().addImage('img/sound.png')
		.setImgSize(pxConv(50),pxConv(50)));

	if(muted){
		muteBtn.objs[0].setAlpha(0.3);
	}else{
		muteBtn.objs[0].setAlpha(1);
	}

restartLvlBtn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, io.canvas.height/2 - pxConv(10), pxConv(60), pxConv(60))
  .setRoundingRadius(pxConv(2))
  .setFillStyle(colors['orange'][0])
  .setStrokeStyle(colors['orange'][1],pxConv(2)),20);

restartLvlBtn.addObj(new iio.Rect().addImage('img/restartBtn.png')
  .setImgSize(pxConv(50),pxConv(50)));


	menuBtn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, io.canvas.height/2 + pxConv(130), pxConv(60), pxConv(60))
		.setRoundingRadius(pxConv(2))
		.setFillStyle(colors['orange'][0])
		.setStrokeStyle(colors['orange'][1],pxConv(2)),20).addObj(new iio.Rect().addImage('img/menu.png').setImgSize(pxConv(50),pxConv(50)));

	testBtn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, io.canvas.height/2 + pxConv(65 * 99), pxConv(60), pxConv(30))
		.setRoundingRadius(pxConv(2))
		.setFillStyle(colors['purple'][0])
		.setStrokeStyle(colors['purple'][1],pxConv(2)),20);

	testBtn.text = io.addToGroup('MENU', new iio.Text('AntiAlias',testBtn.pos)
		.setFont(pxConv(20)+'px OpenSans')
		.setTextAlign('center')
		.setFillStyle('white'),20);


	level.pause = true
	gameOn = false;


	io.pauseB2World(true);
	io.pauseFramerate(true);
		//console.log(io);
}
function resume(io){
if(tutorialTween){
  tutorialTween.start();

}

  if(level.tween){
  level.tween.start();
}
	gameoverText = null;
	unPauseBtn.pos.x = pxConv(-50);
	io.rmvFromGroup('MENU');


 clearBtns()

	pauseBtn.pos.x = pxConv(25); //show pause button

	level.pause = false;
	gameOn = true;


	//io.setFramerate(60);

	//io.pauseFramerate();

	io.pauseB2World(false);
	io.pauseFramerate(false);
	//console.log(io);
}


function winGame(io){


	gameOn = false;
  if(level.tween){
    level.tween.stop();
    level.tween = undefined;

  }

 	if (supports_html5_storage() != false) {
 		var saveLvl = currentLvl + 1;
 		localStorage["level." + saveLvl] = true;
 	}

	//SHOW WIN TEXT

	var winText = io.addToGroup('MENU',(new iio.Text('Level ' + currentLvl + ' Clear!',iio.Vec.add(io.canvas.width/2,-pxConv(60),0,0)))
		.setFont(pxConv(40)+'px OpenSans')
		.setTextAlign('center')
		.setFillStyle('white'),20);

	//SHOW NEXT LEVEL BUTTON
	nextLvlBtn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, -100, pxConv(120), pxConv(50))
		.setRoundingRadius(10)
		.setStrokeStyle(colors['sunset'][1]).setLineWidth(2)
		.setFillStyle(colors['sunset'][0]),20);
	nextLvlBtn.text = io.addToGroup('MENU', new iio.Text('Next Level',nextLvlBtn.pos)
		.setFont(pxConv(20)+'px OpenSans')
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
			winText.pos.y = this.y/2 - 20;
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
				nextLvlBtn.text.pos.y = nextLvlBtn.pos.y + pxConv(8);
			}
		} )
		.delay(1000)
		.start();

var dataURL = io.canvas.toDataURL();
console.log(dataURL);


	setTimeout(function(){io.pauseB2World(true);}, 2000)

	//io.pauseFramerate(true);

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
		.setTextAlign('center')
		.setFillStyle('white'),20);
		restartLvlBtn.text.pos.y = restartLvlBtn.pos.y + pxConv(9);

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
				restartLvlBtn.text.pos.y = restartLvlBtn.pos.y + pxConv(8);

			}
		} )
		.delay(1000)
		.start();

	io.pauseB2World(true);
	io.pauseFramerate(true);
}

function intro(io){

	io.canvas.width = GAMEWIDTH*PIXEL_RATIO;
	io.canvas.height = GAMEHEIGHT*PIXEL_RATIO;
	gameIntro = false;
	gameOn = false;

	if ( world != null )
		world = null;

	io.rmvAll();


	world = new b2World(new b2Vec2(0, 20*PIXEL_RATIO),true); //make into function

	io.addB2World(world);


	io.addToGroup('BACKGROUND',new iio.Rect(pxConv(GAMEWIDTH/2),pxConv(GAMEHEIGHT/2),pxConv(GAMEWIDTH),pxConv(GAMEHEIGHT)).addImage('img/mountain.png',function() {console.log('bgLoad');loadResources++}),-30);

//Show credits BTN
  creditsBtn = io.addToGroup('MENU',new iio.Rect(io.canvas.width - pxConv(30), io.canvas.height - pxConv(15), pxConv(50), pxConv(15))
  .addImage('img/credits-btn.png').setAlpha('0.8')
  ,20);

	//SHOW LOGO
	var logo = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, pxConv(-100), pxConv(207), pxConv(153))
		.addImage('img/logo.png',function() {console.log('logoLoad'); loadResources++})
		,20);

	//SHOW START BUTTON
	startBtn = io.addToGroup('MENU',new iio.Rect(io.canvas.width/2, -100, pxConv(98), pxConv(94))
		.addImage('img/startBtn.png',function() {console.log('startBtnLoad'); loadResources++})
		,20);


	new TWEEN.Tween( { x:io.canvas.width/2, y: logo.pos.y } )
		.to( { x: io.canvas.width/2,y: io.canvas.height/2 - logo.height/2}, 1000 )
		.easing( TWEEN.Easing.Elastic.Out)
		.onUpdate( function () {
			logo.pos.y = this.y;
			logo.pos.x = this.x;
			logo.styles.alpha = 1;
		} )
		.delay(1000)
		.start();

	new TWEEN.Tween( { x: 0, y:0})
		.to( { x: io.canvas.width/2,y: io.canvas.height/2 + 50}, 1000 )
		.easing( TWEEN.Easing.Bounce.Out)
		.onUpdate( function () {
			if(startBtn){
				startBtn.pos.y = this.y;
			}
		} )
		.delay(1700)
		.onComplete(function(){
			gameIntro = true;
		})
		.start();

	var fixDef = new b2FixtureDef;
	fixDef.friction = 1;
	fixDef.restitution = 0.5;

	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_staticBody;

	//GROUND
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(GAMEWIDTH/2,true),pxConv(0,true));
	bodyDef.position.Set(pxConv(GAMEWIDTH/2,true),pxConv(GAMEHEIGHT,true));
	prepShape(bodyDef, fixDef).setFillStyle(colors['red'][0]);

	//BASIN WALLS
	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(GAMEHEIGHT/2,true));
	bodyDef.position.Set(pxConv(0 - 0,true),pxConv(GAMEHEIGHT/2,true));
	prepShape(bodyDef, fixDef).setFillStyle(colors['yellow'][0]);

	fixDef.shape = new b2PolygonShape;
	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(GAMEHEIGHT/2,true));
	bodyDef.position.Set(pxConv(GAMEWIDTH - 0,true),pxConv(GAMEHEIGHT/2,true));
	prepShape(bodyDef, fixDef).setFillStyle(colors['green'][0]);




	io.canvas.width = GAMEWIDTH*PIXEL_RATIO;
	io.canvas.height = GAMEHEIGHT*PIXEL_RATIO;



	io.canvas.style.width = window.innerWidth + 'px';
	io.canvas.style.height = window.innerHeight + 'px';


}
function createWorld(io,levelNumber){
	//DO INTRO ANIMATION

  gameOn = true;

  io.canvas.width = GAMEWIDTH;
  io.canvas.height = GAMEHEIGHT;
/*

  var gradient=io.context.createLinearGradient(0,0,io.canvas.width/2,0);

  gradient.addColorStop("0","#333");
  gradient.addColorStop("1.0","transparent");

  var curtainIn = io.addToGroup('Stuff',(new iio.Rect(io.canvas.width/2,io.canvas.height/2,io.canvas.width,io.canvas.height))
    .setFillStyle(gradient),20);*/

if(level){
  level.tween = null;
  level.tweenBack = null;
  //Stop weird glitch
}



	if ( world != null )
		world = null;


  io.rmvAll(); //clean the world

	startBtn = restartLvlBtn = nextLvlBtn = backBtn = nextBtn = undefined;
    //create the box2d world
	world = io.addB2World(new b2World(
    new b2Vec2(0, 25*PIXEL_RATIO)    //gravity
   	,true                 //allow sleep
	));


    var gradient=io.context.createLinearGradient(0,0,io.canvas.width/2,0);

    gradient.addColorStop("0","#333");
    gradient.addColorStop("1.0","transparent");

  /*  var curtain = io.addToGroup('derp',(new iio.Rect(io.canvas.width,io.canvas.height/2,io.canvas.width*2,io.canvas.height))
      .setFillStyle(gradient),20);*/

      //Pause for transition anim
      io.pauseB2World(true);
      io.pauseFramerate(true);


	if(levelNumber){
		currentLvl = levelNumber;
		level = eval( "io.activatelvl"+levelNumber+"(io);" );
		//ADD PAUSE BTN
		pauseBtn = io.addObj(new iio.Rect(pxConv(25),pxConv(25), pxConv(40), pxConv(40)));
	  pauseBtn.addObj(new iio.Rect().addImage('img/pause.png').setImgSize(pxConv(45)));

    if(levelNumber == 1){
      tutorial(io);
    }else{
      tutorialTween = null;
    }

	}else{
		level = io.activateLevelSelect(io);
	}


	world.SetContactListener(listener);

	if(level){
    level.setup();
    /*new TWEEN.Tween( {x: io.canvas.width } )
      .to( { x:io.canvas.width*2}, 1000 )
      .easing( TWEEN.Easing.Bounce.Out)
      .onUpdate( function () {
        curtain.pos.x = this.x;
      } )
      .onComplete(function(){
        io.pauseB2World(false);
      	io.pauseFramerate(false);
      })
      .delay(500)
      .start();*/
      io.pauseB2World(false);
      io.pauseFramerate(false);

  }else{
    level = null;
  }



	gameIntro = false;





	io.canvas.width = GAMEWIDTH*PIXEL_RATIO;
	io.canvas.height = GAMEHEIGHT*PIXEL_RATIO;


	io.canvas.style.width = window.innerWidth + 'px';
	io.canvas.style.height = window.innerHeight + 'px';





/*
	console.log('io.canvas W/H = ' + io.canvas.width+'/'+io.canvas.height);
	console.log('css canvas W/H = ' + io.canvas.style.width+'/'+io.canvas.style.height)
	console.log('screen W/H = ' +  window.innerWidth+'/'+window.innerHeight);
	console.log('scale X = ' +  scaleX +' Y = '+scaleY);
	console.log('pixel_ratio = ' + PIXEL_RATIO);
*/
}
function tutorial(io){
  var finger = io.addObj(new iio.Rect(pxConv(GAMEWIDTH/2 + 100),pxConv(450), pxConv(80), pxConv(80)).addImage('img/Point.png').setImgSize(pxConv(90)).setAlpha(0.8));
  var destination = {};
  if(GAMEHEIGHT == 480){
    destinationBlock = {x:  pxConv(60), y: pxConv(460) }
    destinationGoal = {x: pxConv(GAMEWIDTH/2), y: pxConv(100) }

  }else{
    destinationBlock = {x: pxConv(60), y: pxConv(560) }
    destinationGoal = {x: pxConv(GAMEWIDTH/2), y: pxConv(170) }
  }

  //Move Finger to first block
   tutorialTween = new TWEEN.Tween( {x: finger.pos.x , y: finger.pos.y } )
   .to( { x:destinationBlock.x, y:destinationBlock.y}, 2000 )
   .easing( TWEEN.Easing.Quadratic.In)
   .onUpdate( function () {
     finger.pos.x = this.x;
     finger.pos.y = this.y;
   })
   .delay(100)
   .onComplete(function() {
     fakeEffect = io.addToGroup('MOUSEJOINT', new iio.Circle(finger.pos.x ,finger.pos.y,0).setFillStyle('rgba(255,255,255,0.4)'),10);
     touchSound.play();
     finger.addImage('img/Press_Hold.png').setImgSize(pxConv(90));

     new TWEEN.Tween( {y: 0 } )
      .to( { x:pxConv(50)}, 1000 )
      .easing( TWEEN.Easing.Back.Out)
      .onUpdate( function () {
        fakeEffect.radius = this.x;
      })
      .onComplete(function(){
        new TWEEN.Tween( {fx: finger.pos.x, fy: finger.pos.y,jx: fakeEffect.pos.x, jy:fakeEffect.pos.y} )
         .to( { fx: destinationGoal.x, fy: destinationGoal.y,jx: destinationGoal.x, jy: destinationGoal.y}, 1500 )
         .easing( TWEEN.Easing.Quadratic.In)
         .onUpdate( function () {

           finger.pos.x = this.fx;
           finger.pos.y = this.fy;
            fakeEffect.pos.x = this.jx;
            fakeEffect.pos.y = this.jy;
         })
        .delay(100)
        .onComplete(function(){
          finger.addImage('img/Point.png').setImgSize(pxConv(90));
          io.rmvObj(fakeEffect);

          //io.rmvObj(finger);

          new TWEEN.Tween( {opacity: 1} )
           .to( { opacity: 0}, 1000 )
           .easing( TWEEN.Easing.Quadratic.In)
           .onUpdate( function () {

              finger.setAlpha(this.opacity);
            //  console.log(this.opacity);
            tutorialTween = null;


           })
          .onComplete(function(){
            io.rmvObj(finger);
          })
          .delay(0)
          .start();


        })

         .start();

      })
         .delay(0)

      .start();

   });



tutorialTween.delay(1000);
tutorialTween.start();


}

function endCredits(io){

	io.canvas.width = GAMEWIDTH*PIXEL_RATIO;
	io.canvas.height = GAMEHEIGHT*PIXEL_RATIO;
	gameIntro = false;
	gameOn = false;

	if ( world != null )
		world = null;

	io.rmvAll();

	world = new b2World(new b2Vec2(0, 20*PIXEL_RATIO),true); //make into function

	io.addB2World(world);


  io.pauseB2World(false);
	io.pauseFramerate(false);


	io.addToGroup('BACKGROUND',new iio.Rect(pxConv(GAMEWIDTH/2),pxConv(GAMEHEIGHT/2),pxConv(GAMEWIDTH),pxConv(GAMEHEIGHT)).addImage('img/mountain.png',function() {console.log('bgLoad');loadResources++}),-30);


    	var fixDef = new b2FixtureDef;
    	fixDef.friction = 1;
    	fixDef.restitution = 0.5;

    	var bodyDef = new b2BodyDef;
    	bodyDef.type = b2Body.b2_staticBody;

var padding = 0;

if(GAMEHEIGHT > 480){
  padding = 19;

}

    	//GROUND
    	fixDef.shape = new b2PolygonShape;
    	fixDef.shape.SetAsBox(pxConv(GAMEWIDTH/2,true),pxConv(padding,true));
    	bodyDef.position.Set(pxConv(GAMEWIDTH/2,true),pxConv(GAMEHEIGHT,true));
    	prepShape(bodyDef, fixDef);

    	//BASIN WALLS
    	fixDef.shape = new b2PolygonShape;
    	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(GAMEHEIGHT/2,true));
    	bodyDef.position.Set(pxConv(0 - 0,true),pxConv(GAMEHEIGHT/2,true));
    	prepShape(bodyDef, fixDef).setFillStyle(colors['yellow'][0]);

    	fixDef.shape = new b2PolygonShape;
    	fixDef.shape.SetAsBox(pxConv(0,true),pxConv(GAMEHEIGHT/2,true));
    	bodyDef.position.Set(pxConv(GAMEWIDTH - 0,true),pxConv(GAMEHEIGHT/2,true));
    	prepShape(bodyDef, fixDef).setFillStyle(colors['green'][0]);



      	//SHAPES!
      	bodyDef = new b2BodyDef;
      	fixDef = new b2FixtureDef;
      	fixDef.friction = 0.5;
      	fixDef.restitution = 0.3;
      	fixDef.density = 5;
      	bodyDef.type = b2Body.b2_dynamicBody;
      	fixDef.shape = new b2PolygonShape;


setTimeout(function(){
        fixDef.shape.SetAsBox(pxConv(150 ,true),pxConv(20,true));
      	bodyDef.position.Set(pxConv(GAMEWIDTH/2 ,true),pxConv(-30 ,true));
      	prepShape(bodyDef, fixDef).addImage('img/credits-name.png');},0);
setTimeout(function(){
      bodyDef.angle = -0.5;
      fixDef.shape.SetAsBox(pxConv(120 ,true),pxConv(25,true));
      bodyDef.position.Set(pxConv(GAMEWIDTH/2 ,true),pxConv(-60 ,true));
      prepShape(bodyDef, fixDef).addImage('img/credits-by.png');},100);
setTimeout(function(){
  bodyDef.angle = 0;

  fixDef.shape.SetAsBox(pxConv(140 ,true),pxConv(35,true));
bodyDef.position.Set(pxConv(GAMEWIDTH/2 ,true),pxConv(-160 ,true));
prepShape(bodyDef, fixDef).addImage('img/credits-playing.png');},1300);
setTimeout(function(){        fixDef.shape.SetAsBox(pxConv(50 ,true),pxConv(25,true));
        bodyDef.position.Set(pxConv(GAMEWIDTH/2 ,true),pxConv(-200 ,true));
        prepShape(bodyDef, fixDef).addImage('img/credits-for.png');},1010);
setTimeout(function(){        fixDef.shape.SetAsBox(pxConv(150 ,true),pxConv(35,true));
        bodyDef.position.Set(pxConv(GAMEWIDTH/2 ,true),pxConv(-260 ,true));
        prepShape(bodyDef, fixDef).addImage('img/credits-thanks.png');},1200);
setTimeout(function(){    fixDef.shape.SetAsBox(pxConv(150 ,true),pxConv(100,true));
    bodyDef.position.Set(pxConv(GAMEWIDTH/2 ,true),pxConv(-1060 ,true));
    prepShape(bodyDef, fixDef).addImage('img/logo.png');


  },2000);

setTimeout(function(){
  backBtn = io.addToGroup('MENU',new iio.Rect(pxConv(35),pxConv(30), pxConv(35), pxConv(35)).addImage('img/backBtn.png'),20);



},3200);








	io.canvas.width = GAMEWIDTH*PIXEL_RATIO;
	io.canvas.height = GAMEHEIGHT*PIXEL_RATIO;



	io.canvas.style.width = window.innerWidth + 'px';
	io.canvas.style.height = window.innerHeight + 'px';


}

function soundControl(bool){
	if(muted == true){
		muted = false;
		sound.play(function(id){
			bgMusicID = id;
		});
		localStorage["muted"] = false;
		muteBtn.objs[0].setAlpha(1);
		sound._audioNode[0].paused = false;

	}else{
		sound.pause(bgMusicID);
		localStorage["muted"] = true;
		muted = true;
		muteBtn.objs[0].setAlpha(0.3);
	}
}
function prepShape(bodyDef, fixDef,group,zIndex){
	if(!group){
		group = 'worldObj';
	}
	if(!zIndex){
		zIndex = 0;
	}

	return  lio.addToGroup(group,world.CreateBody(bodyDef),zIndex)
	        .CreateFixture(fixDef)
	        .GetShape()
	        .prepGraphics(lio.b2Scale);
};

function pxConv(x,box2dconv){
	x = x * PIXEL_RATIO;
	if(box2dconv == true){

		x = x / PTM;

	}
	return x;
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function createParticle(io){
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
	fixDef.shape.SetAsBox(pxConv(height), pxConv(width));

	var color = iio.getRandomNum(0,Object.keys(colors).length-1)
	color = Math.round(color)

	var currentColor = getColor(color);
	bodyDef.position.Set(pxConv(x,true),pxConv(-100,true));
	prepShape(bodyDef, fixDef).setFillStyle(currentColor[0]).setStrokeStyle(currentColor[1],pxConv(2));
}
function getColor(iGet){
	var j = -1;
	for(index in colors){
		j++
		if(iGet == j)
			return colors[index];
	}
}
function clearBtns(){
  muteBtn = undefined;
  menuBtn = undefined;
  testBtn = undefined;
  restartLvlBtn = undefined;
  backBtn = undefined;
  creditsBtn = undefined;

}


function decimalAdjust(type, value, exp) {
	// If the exp is undefined or zero...
	if (typeof exp === 'undefined' || +exp === 0) {
		return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// If the value is not a number or the exp is not an integer...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		return NaN;
	}
	// Shift
	value = value.toString().split('e');
	value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

// Decimal round
if (!Math.round10) {
	Math.round10 = function(value, exp) {
		return decimalAdjust('round', value, exp);
	};
}
