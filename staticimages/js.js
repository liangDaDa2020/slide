window.onload=function(){
	var banner1 =new banner({
		el:'#banner1',
		isAuto:true,
		speed:1000
	});
	console.log(banner1)
	var banner2 =new banner({
		el:'#banner2'
	});
	console.log(banner2)
	
}
function banner(obj){
	this.bannerBox=$(obj.el);
	this.isAuto=obj.isAuto?obj.isAuto:false;
	this.speed=obj.speed?obj.speed:3000;
	this.bannerL=this.bannerBox.children(".bannerL");
	this.imgBox=this.bannerBox.find(".imgBox");
	this.leftBtn=this.bannerBox.children(".leftBtn");
	this.rightBtn=this.bannerBox.children(".rightBtn");
	this.imgNum=this.imgBox.length;
	this.step=this.imgBox[0].clientWidth;
	this.index=1;
	this.timer=null;
	
	this.init();
}
banner.prototype.init=function(){
	var This=this;
	this.leftBtn.click(function(){
		This.lrBtn(1);
	})
	this.rightBtn.click(function(){
		This.lrBtn(-1)
	})
	if(this.isAuto){
		This.auto(true);
		this.bannerBox.hover(function(){
			clearTimeout(This.timer);
		},function(){
			This.auto(true);
		})
	}
}
banner.prototype.lrBtn=function(num){
	this.index+=num;
	this.move();
}
banner.prototype.move=function(){
	var This=this;
	var moveL=this.index*this.step*-1+"px";
	if(this.index>=this.imgNum-1){
		this.bannerL.stop().animate({marginLeft:moveL},function(){
			var moverk=This.step*(-1)+"px";
			This.bannerL.stop().css({marginLeft:moverk},1);
			This.index=1;
		})
	}else if(this.index<=0){
		this.bannerL.stop().animate({marginLeft:moveL},function(){
			var moverk=This.step*(This.imgNum-2)*(-1)+"px";
			This.bannerL.stop().css({marginLeft:moverk},1);
			This.index=This.imgNum-2;
			
		})
	}else{
		this.bannerL.animate({marginLeft:moveL});
	}
}
banner.prototype.auto=function(){
	if(this.isAuto){
		var speed=this.speed?this.speed:3000;
		var This=this;
		this.timer=setInterval(function(){
			This.index++;
			This.move();
		},speed)
	}
}










