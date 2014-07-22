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
	this.io.setBGColor('white');
	this.io.addToGroup('BACKGROUND',new iio.Rect(pxConv(this.cWidth/2),pxConv(this.cHeight/2),pxConv(this.cWidth),pxConv(this.cHeight)).addImage(this.imgPath+'mountain.png'),-30);
	
	this.io.addToGroup('LEVEL',(new iio.Text('Level Select!',iio.Vec.add(pxConv(this.cWidth/2),pxConv(60),0,0)))
		.setFont(pxConv(40)+'px OpenSans')
		.setTextAlign('center')
		.setFillStyle('black'),20);
		this.lvlButtons.push(null);
		
	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(50),pxConv(130), pxConv(this.btnSize), pxConv(this.btnSize)).setFillStyle('yellow').addObj(new iio.Text('1').setFont(pxConv(20)+'px OpenSans')
	.setTextAlign('center')
	.setFillStyle('black')) 
	));
	
	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(90 + 50),pxConv(130), pxConv(this.btnSize), pxConv(this.btnSize)).setFillStyle('orange').addObj(new iio.Text('2').setFont(pxConv(20)+'px OpenSans')
	.setTextAlign('center')
	.setFillStyle('black')) 
	));
	
	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(90*2 + 50),pxConv(130), pxConv(this.btnSize), pxConv(this.btnSize)).setFillStyle('red').addObj(new iio.Text('3').setFont(pxConv(20)+'px OpenSans')
	.setTextAlign('center')
	.setFillStyle('black')) 
	));

	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(50),pxConv(130 + 90 ), pxConv(this.btnSize), pxConv(this.btnSize)).setFillStyle('green').addObj(new iio.Text('4').setFont(pxConv(20)+'px OpenSans')
	.setTextAlign('center')
	.setFillStyle('black')) 
	));
	

}
lvlSelect.prototype.step = function(){
}
iio.AppManager.prototype.activateLevelSelect = function(io){
	this.level = new iio.lvlSelect(io);
	return this.level;
}

})();