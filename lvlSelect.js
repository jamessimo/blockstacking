(function(){
//Definition

function lvlSelect(io){
	//CANVAS VARS
	this.io = io;
	this._io = io;
	this.cHeight = io.canvas.height;
	this.cWidth = io.canvas.width;
	this.imgPath = 'img/';
	this.loadResources = 0;
	this.totalResources = 5;
	
	this.btnSize = 80;
	
	//Levels
	this.lvlButtons =  new Array();
	   
}; iio.lvlSelect = lvlSelect;

lvlSelect.prototype.setup = function(){
	
	this.io.addToGroup('BACKGROUND',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2),pxConv(this.cWidth),pxConv(this.cHeight)).addImage(this.imgPath+'mountain.png'),-30);
	
	this.backBtn = this.io.addToGroup('MENU',new iio.Rect(pxConv(35),pxConv(25), pxConv(50), pxConv(50)).addImage('img/backBtn.png'),20)

	this.lvlButtons.push(null);
		
	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(50),pxConv(130), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors[0][1],4)
	));

	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(90 + 50),pxConv(130), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors[1][1],4)
	));
	
	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(90*2 + 50),pxConv(130), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors[2][1],4) 
	));

	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(50),pxConv(130 + 90 ), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors[3][1],4)
	));

	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(90 + 50),pxConv(130 + 90 ), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors[3][1],4)
	));

	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(90*2 + 50),pxConv(130 + 90 ), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(colors[3][1],4)
	));



	//Paint all 


	for(var i = 1 ; i < this.lvlButtons.length ; i++){

		if(localStorage["level." + i] == "true"){
			this.lvlButtons[i].addObj(new iio.Text(i).setFont(pxConv(40)+'px KGWhattheTeacherWants')
			.setTextAlign('center')
			.setFillStyle(this.lvlButtons[i].styles.strokeStyle));

			var btnPos = new iio.Vec(this.lvlButtons[i].pos);
			btnPos.y += 11;
			this.lvlButtons[i].objs[0].pos = btnPos;
		}else{
			this.lvlButtons[i].addObj(new iio.Rect().addImage('img/lock.png')
			.setImgSize(65,75)
			.setAlpha(0.7));

			this.lvlButtons[i].setStrokeStyle(colors[12][0]).setAlpha(0.7);

		}

	}

	
	if(CocoonJS.nativeExtensionObjectAvailable){ 
		fullscreen1Params = {
		    "fullscreenAdUnit" : "f28daed244254154944ad407ba31ce99",
		    "refresh" : 20
		};
	

		//PUT THIS INTO A PROMISE 
		if(!adReady)
	    	fullscreen1 = CocoonJS.Ad.createFullscreen(fullscreen1Params);
		else
			fullscreen1.refreshFullScreen();
		
	    fullscreen1.onFullScreenShown.addEventListener(function()
	    {
	        console.log("fullscreen1 onFullScreenShown");
	    });
	    fullscreen1.onFullScreenHidden.addEventListener(function()
	    {
	        console.log("fullscreen1 onFullScreenHidden");
	        //fullscreen1.refreshFullScreen();
	    });
	    fullscreen1.onFullScreenReady.addEventListener(function()
	    {
	    	adReady = true;
	        console.log("fullscreen1 onFullScreenReady");
	    });
	}

}
lvlSelect.prototype.step = function(){
}
iio.AppManager.prototype.activateLevelSelect = function(io){
this.level = new iio.lvlSelect(io);
return this.level;
}

})();