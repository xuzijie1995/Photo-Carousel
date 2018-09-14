function PhotoCarousel(obj){
	var _this = this;
	_this.checkInput(obj,_this);
	_this.pg = {
		startX:0,
		endX:0,
		startY:0,
		endY:0,
		nx:0,
		offsetX:0,
		offsetY:0,
		index:0,
		flag:false,
		disabled:false,
		maxX:obj.maxX||10,
		maxY:obj.maxY||100,
		moveFlag:obj.moveFlag||true,
		inMobileFlag:obj.inMobileFlag||false,
		sensibility:obj.sensibility||1,
		data:obj.data,
		images:obj.images,
		clientWidth:0,
		clock:'',
		interval:obj.interval||5
	}
	_this.init=function(){
		var photoCarouselContent = document.createDocumentFragment();
		var photoCarousel = document.createElement("div");
		photoCarousel.classList.add("photo-carousel");
		var photoCarouselImgList = document.createElement("ul");
		photoCarouselImgList.classList.add("photo-carousel-imgList");
		var photoCarouselPointList = document.createElement("ul");
		photoCarouselPointList.classList.add("photo-carousel-pointList");
		var i,el,img,length = _this.pg.images.length;
		for(i=0;i<3;i++){
			el = document.createElement("li");
			img = document.createElement("img");
			if(i==0){
				img.setAttribute('src',_this.pg.images[_this.pg.images.length-1]);
			}else{
				img.setAttribute('src',_this.pg.images[i-1]);
			}
			el.appendChild(img);
			photoCarouselImgList.appendChild(el);
		}
		if(length>1){
			_this.addEventHandler(photoCarouselImgList,'mousedown',function(){
				_this.down(_this);
			});
			_this.addEventHandler(photoCarouselImgList,'touchstart',function(){
				_this.down(_this);
			});
			_this.addEventHandler(photoCarouselImgList,'mousemove',function(){
				_this.move(_this);
			});
			_this.addEventHandler(photoCarouselImgList,'touchmove',function(){
				_this.move(_this);
			});
			_this.addEventHandler(photoCarouselImgList,'mouseup',function(){
				_this.end(_this);
			});
			_this.addEventHandler(photoCarouselImgList,'touchend',function(){
				_this.end(_this);
			});
			_this.addEventHandler(photoCarouselImgList,'click',function(){
				_this.imgClick(_this);
			});
			_this.addEventHandler(photoCarouselPointList,'click',function(){
				_this.pointClick(_this);
			});
		}
		var el="<li class='active' data-index='0'></li>";
		for(var i=1;i<length;i++){
			el+="<li data-index="+i+"></li>";
		}
		photoCarouselPointList.innerHTML=el;
		photoCarousel.appendChild(photoCarouselImgList);
		photoCarousel.appendChild(photoCarouselPointList);
		photoCarouselContent.appendChild(photoCarousel);
		_this._el.appendChild(photoCarousel);
		if(length>1){_this.goPhotoCarousel()}
	}
}
PhotoCarousel.prototype.imgClick=function(_this){
	var _event = event.target;
	if(_event.nodeName.toLowerCase()=='li'||_event.nodeName.toLowerCase()=='img'){
		event.stopPropagation();
		var touch;
		if(event.touches){
			touch = event.touches[0]
		}else{
			touch = event;
		}
		if(touch.clientX == _this.pg.nx){
			var a = document.createElement("a");
			a.target = "_blank";
			a.href=_this.checkHttp(_this.pg.data[_this.pg.index]['url']);
			a.click();
		}
	}
}
PhotoCarousel.prototype.pointClick=function(_this){
	var _event = event.target;
	if(_event.nodeName.toLowerCase()=='li'){
		event.stopPropagation();
		var nowIndex=_event.getAttribute('data-index');
		if(nowIndex==_this.pg.index)return false;
		_this.stopPhotoCarousel();
		_this._el.querySelector(".photo-carousel-pointList li.active").classList.remove("active");
		_event.classList.add("active");
		var els = _this._el.querySelectorAll(".photo-carousel-imgList li");
		if(nowIndex>_this.pg.index){
			els[2].setAttribute('src',_this.pg.images[nowIndex]);
			_this.pg.index=nowIndex;
			els[2].querySelector("img").setAttribute("src",_this.pg.images[nowIndex]);
			els[2].style.left = "0%";
			els[1].style.left = "-100%";
			els[1].querySelector("img").setAttribute("src",_this.pg.images[nowIndex-1]);
			els[0].parentNode.removeChild(els[0]);
			_this._el.querySelector(".photo-carousel-imgList").insertAdjacentHTML("beforeend","<li><img src='"+_this.setPhotoCarousel(false)+"'></li>");
		}else{
			_this.pg.index=nowIndex;
			els[0].querySelector("img").setAttribute("src",_this.pg.images[nowIndex*1]);
			els[0].style.left = "0%";
			els[1].style.left = "100%";
			els[1].querySelector("img").setAttribute("src",_this.pg.images[nowIndex*1+1]);
			els[2].parentNode.removeChild(els[2]);
			_this._el.querySelector(".photo-carousel-imgList").insertAdjacentHTML("afterbegin","<li><img src='"+_this.setPhotoCarousel(true)+"'></li>");
		}
		console.log(_this.pg.index.toString());
		_this.goPhotoCarousel();
	}
}
PhotoCarousel.prototype.down=function(_this){
	if(!_this.pg.flag){
		_this.pg.flag=true;
		var touch = PhotoCarousel.prototype.getTouchEnvent();
		_this.pg.startX = _this.pg.nx = touch.clientX;
		_this.pg.startY = touch.clientY;
		_this.pg.clientWidth = _this._el.querySelector(".photo-carousel-imgList").clientWidth;
	}
}
PhotoCarousel.prototype.move=function(_this){
	if(!_this.pg.inMobileFlag){event.preventDefault();}
	if(_this.pg.disabled)return false;
	if(_this.pg.flag){
		_this.stopPhotoCarousel();
		var touch = PhotoCarousel.prototype.getTouchEnvent();
		_this.pg.endX = touch.clientX;
		_this.pg.endY = touch.clientY;
		/*if(touch.clientX>_this.pg.x){
			++_this.pg.offsetX;
		}else if(touch.clientX<_this.pg.x){
			--_this.pg.offsetX;
		}*/
		//_this.pg.x=touch.clientX;
		if(_this.pg.moveFlag){
			PhotoCarousel.prototype.moveTrasition(_this);
		}
	}
}
PhotoCarousel.prototype.moveTrasition =function(_this){
	var els = _this._el.querySelectorAll(".photo-carousel-imgList li");
	_this.pg.offsetX = ((_this.pg.endX - _this.pg.startX)*100/_this.pg.clientWidth);
	console.log(_this.pg.offsetX);
	if(_this.pg.offsetX*1>=_this.pg.maxX*1){
		_this.pg.offsetX = _this.pg.maxX;
		els[0].style.left = -100 + _this.pg.maxX*1 + "%";
		els[1].style.left = _this.pg.maxX*1 + "%";
		els[2].style.left = "100%";
	}else if(_this.pg.offsetX*1>_this.pg.maxX*-1){
		els[0].style.left = -100+_this.pg.offsetX*1+ "%";
		els[2].style.left = 100+_this.pg.offsetX*1+ "%";
		els[1].style.left =_this.pg.offsetX*1+ "%";
	}else{
		_this.pg.offsetX = -1*_this.pg.maxX;
		els[2].style.left = 100+_this.pg.maxX*-1+"%";
		els[1].style.left = _this.pg.maxX*-1+"%";
		els[0].style.left = "-100%";
	}
}
PhotoCarousel.prototype.end=function(_this){
	_this.pg.flag=false;
	if(_this.pg.disabled)return false;
	_this.pg.offsetY=Math.abs(_this.pg.startY-_this.pg.endY);
	if(_this.pg.offsetY>_this.pg.maxY*1){
		return false;
	}
	_this.pg.offsetX = ((_this.pg.endX - _this.pg.startX)*100/_this.pg.clientWidth);
	var els = _this._el.querySelectorAll(".photo-carousel-imgList li");
	if(_this.pg.offsetX*1>=_this.pg.maxX*1){//left -> right
		els[1].style.left = "100%";
		els[0].style.left = "0";
		els[2].parentNode.removeChild(els[2]);
		_this.pg.index = _this.getPhotoCarouselIndex(true,_this.pg.index,_this.pg.images.length);
		_this._el.querySelector(".photo-carousel-imgList").insertAdjacentHTML("afterbegin","<li><img src='"+_this.setPhotoCarousel(true)+"'></li>");
		_this._el.querySelector(".photo-carousel-pointList li.active").classList.remove("active");
		_this._el.querySelectorAll(".photo-carousel-pointList li")[_this.pg.index].classList.add("active");
		_this.pg.disabled=true;
		setTimeout(function(){
			_this.pg.disabled=false;
		},900);
	}else if(_this.pg.offsetX*1>_this.pg.maxX*-1){
		els[2].style.left = "100%";
		els[1].style.left = "0%";
		els[0].style.left = "-100%";
    }else{//right -> left
    	els[1].style.left = "-100%";
    	els[2].style.left = "0%";
    	els[0].parentNode.removeChild(els[0]);
    	_this.pg.index = _this.getPhotoCarouselIndex(false,_this.pg.index,_this.pg.images.length);
    	_this._el.querySelector(".photo-carousel-imgList").insertAdjacentHTML("beforeend","<li><img src='"+_this.setPhotoCarousel(false)+"'></li>");
    	_this._el.querySelector(".photo-carousel-pointList li.active").classList.remove("active");
    	_this._el.querySelectorAll(".photo-carousel-pointList li")[_this.pg.index].classList.add("active");
    	_this.pg.disabled=true;
    	setTimeout(function(){
    		_this.pg.disabled=false;
    	},900);
    }
    _this.goPhotoCarousel();
}
PhotoCarousel.prototype.checkInput=function(obj,_this){
	try
	{
		if(obj.images==null||obj.images.length==0){
			throw "PhotoCarousel {images} can not be null";
			return false;
		}
		_this._el=document.getElementById(obj.id);
		if(_this._el==null){
			throw "PhotoCarousel target element id {"+obj.id+"} not found";
			return false;
		}
	}
	catch(e)
	{
		console.log(e);
	}
}
PhotoCarousel.prototype.checkHttp=function(e){
	if(e=='#'||e.indexOf('javascript:void(0)')>-1){
		return 'javascript:void(0);'
	}
	if(e.indexOf('http://')>-1||e.indexOf('https://')>-1){
		return e;
	}else{
		return 'http://'+e;
	}
}
PhotoCarousel.prototype.addEventHandler=function(target,type,fn){
	if(window.addEventListener){
		addEventHandler=function(target,type,fn){
			target.addEventListener(type,fn);
		}
		return addEventHandler(target,type,fn);
	}else{
		addEventHandler=function(target,type,fn){
			target.attachEvent("on"+type,fn);
		}
		return addEventHandler(target,type,fn);
	}
}
PhotoCarousel.prototype.removeEventHandler=function(target,type,fn){
	if(window.addEventListener){
		removeEventHandler=function(target,type,fn){
			target.removeEventListener(type,fn);
		}
		return removeEventHandler(target,type,fn);
	}else{
		removeEventHandler=function(target,type,fn){
			target.detachEvent("on"+type,fn);
		}
		return removeEventHandler(target,type,fn);
	}
}
PhotoCarousel.prototype.getPhotoCarouselIndex=function(b,c,l){
	if(b){
		if(c*1-1<0){
			return l*1-1;
		}else{
			return c*1-1;
		}
	}else{
		if(c*1+1>l*1-1){
			return 0;
		}else{
			return c*1+1;
		}
	}
}
PhotoCarousel.prototype.setPhotoCarousel=function(b){
	return this.pg.images[this.getPhotoCarouselIndex(b,this.pg.index,this.pg.images.length)];
}
PhotoCarousel.prototype.stopPhotoCarousel=function(){
	clearInterval(this.pg.clock);
}
PhotoCarousel.prototype.goPhotoCarousel=function(){
	this.stopPhotoCarousel();
	var _this = this;
	_this.pg.clock = setInterval(function(){
		var els = _this._el.querySelectorAll(".photo-carousel-imgList li");
		els[1].style.left="-100%";
		els[2].style.left="0%";
		els[0].parentNode.removeChild(els[0]);
		_this.pg.index = _this.getPhotoCarouselIndex(false,_this.pg.index,_this.pg.images.length);
		_this._el.querySelector(".photo-carousel-imgList").insertAdjacentHTML("beforeend","<li><img src='"+_this.setPhotoCarousel(false)+"'></li>");
		_this._el.querySelector(".photo-carousel-pointList li.active").classList.remove("active");
		_this._el.querySelectorAll(".photo-carousel-pointList li")[_this.pg.index].classList.add("active");
	},_this.pg.interval*1000);
}
PhotoCarousel.prototype.getTouchEnvent=function(){
	if(event.touches){
		return event.touches[0]
	}else{
		return event;
	}
}
