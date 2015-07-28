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


	this.btnSpaceX = 40;
	this.btnMargin = 80;

	this.btnSpaceY = 40;
	this.cols = 4;

	this.btnSize = 65;

	if(GAMEHEIGHT != 568){
		this.btnSpaceX = 52;
		this.btnMargin = 70;
		this.btnSpaceY = 20;
		this.btnSize = 60;
	}

	//Levels
	this.lvlButtons =  new Array();

}; iio.lvlSelect = lvlSelect;

lvlSelect.prototype.setup = function(){

	this.io.addToGroup('BACKGROUND',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2),pxConv(this.cWidth),pxConv(this.cHeight)).addImage(this.imgPath+'mountain.png'),-30);

	this.backBtn = this.io.addToGroup('MENU',new iio.Rect(pxConv(35),pxConv(30), pxConv(35), pxConv(35)).addImage('img/backBtn.png'),20)

	this.lvlButtons.push(null);
	var j = 0;
	var k = 0;
	var colorNum = 0;
	var color = getColor(colorNum);

	for(var i = 0; i < MAX_LEVELS ; i++){
			if(i % this.cols === 0){
				colorNum++;
				j++;
				color = getColor(colorNum);
				k = 0;

			}
		this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(this.btnSpaceX + this.btnMargin *k ),pxConv(this.btnSpaceY + (this.btnMargin *j)), pxConv(this.btnSize), pxConv(this.btnSize)).setStrokeStyle(color[1],pxConv(3))));
		k++;
	}

	//Paint all


	for(var i = 1 ; i < this.lvlButtons.length ; i++){

		if(localStorage["level." + i] == "true"){
			this.lvlButtons[i].addObj(new iio.Text(i).setFont(pxConv(40)+'px KGWhattheTeacherWants')
			.setTextAlign('center')
			.setFillStyle(this.lvlButtons[i].styles.strokeStyle));

			var btnPos = new iio.Vec(this.lvlButtons[i].pos);
			btnPos.y += pxConv(13);
			this.lvlButtons[i].objs[0].pos = btnPos;
		}else{
			this.lvlButtons[i].addObj(new iio.Rect().addImage('img/lock.png')
			.setImgSize(pxConv(32),pxConv(37))
			.setAlpha(0.7));

			//this.lvlButtons[i].setStrokeStyle(colors['black'][1][0]).setAlpha(0.7);

		}

	}

}
lvlSelect.prototype.step = function(){
}
iio.AppManager.prototype.activateLevelSelect = function(io){
this.level = new iio.lvlSelect(io);
return this.level;
}

})();
