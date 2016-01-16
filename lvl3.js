(function(){

function lvl3(io){
	//CANVAS VARS
	this.io = io;
	this.cHeight = io.canvas.height;
	this.cWidth = io.canvas.width;

	//GAME VARS
	this.goal =
	this.goalTouch =
	this.goalEffect = undefined;
	this.goalTime = 150;
	this.goalTouchTime = 0;
	this.gameWin =
	this.gameWinAnim =
	this.gameEnd = false;

}; iio.lvl3 = lvl3;

lvl3.prototype.setup = function(){


	levelBuilder.setup(this,'lvl3');


		//SHAPES!
		bodyDef = new b2BodyDef;
		fixDef = new b2FixtureDef;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.3;
		fixDef.density = 5;
		bodyDef.type = b2Body.b2_dynamicBody;
		fixDef.shape = new b2PolygonShape;

		fixDef.shape.SetAsBox(pxConv(1),pxConv(1));
		bodyDef.position.Set(pxConv(this.cWidth/2 ,true),pxConv(this.cHeight/2 ,true));
		prepShape(bodyDef, fixDef).setFillStyle(colors['orange'][0]).setStrokeStyle(colors['orange'][1],pxConv(2));

		fixDef.shape.SetAsBox(pxConv(0.8),pxConv(1.5));
		bodyDef.position.Set(pxConv(this.cWidth/2 + (4 * PTM),true),pxConv(this.cHeight - (45),true));
		prepShape(bodyDef, fixDef).setFillStyle(colors['blue'][0]).setStrokeStyle(colors['blue'][1],pxConv(2));

		fixDef.shape.SetAsBox(pxConv(0.8),pxConv(1.2));
		bodyDef.angle = -0.5;
		bodyDef.position.Set(pxConv(this.cWidth/2 - (80),true),pxConv(this.cHeight - (45),true));
		prepShape(bodyDef, fixDef).setFillStyle(colors['turquoise'][0]).setStrokeStyle(colors['turquoise'][1],pxConv(2));

		fixDef.shape.SetAsBox(pxConv(0.8),pxConv(1));
		bodyDef.angle = 0;
		bodyDef.position.Set(pxConv(this.cWidth/2 + (45),true),pxConv(this.cHeight - (25),true));
		prepShape(bodyDef, fixDef).setFillStyle(colors['purple'][0]).setStrokeStyle(colors['purple'][1],pxConv(2));



}//SETUP

lvl3.prototype.step = function(){
	levelBuilder.step(this);

}//STEP

iio.AppManager.prototype.activatelvl3 = function(io){
	this.level = new iio.lvl3(io);
	return this.level;
}

})();
