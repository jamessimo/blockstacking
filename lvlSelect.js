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
	
	//Levels
	this.lvlButtons =  new Array();
	   
}; iio.lvlSelect = lvlSelect;

lvlSelect.prototype.setup = function(){


	this.io.addToGroup('LEVEL',(new iio.Text('Level Select!',iio.Vec.add(this.cWidth/2,pxConv(60),0,0)))
		.setFont(pxConv(60)+'px OpenSans')
		.setTextAlign('center')
		.setFillStyle('black'),20);
		this.lvlButtons.push(null);
		
	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(150),pxConv(250), pxConv(150), pxConv(150)).setFillStyle('yellow').addObj(new iio.Text('1').setFont(pxConv(20)+'px OpenSans')
	.setTextAlign('center')
	.setFillStyle('black')) 
	));
	
	this.lvlButtons.push(this.io.addToGroup('LEVELBTNS',new iio.Rect(pxConv(350),pxConv(250), pxConv(150), pxConv(150)).setFillStyle('orange').addObj(new iio.Text('2').setFont(pxConv(20)+'px OpenSans')
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