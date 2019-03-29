// JavaScript Document
$.fn.navslider = function(t) {
	var itemWidth = t.itemWidth,
		navPrev = t.navPrev,
		navNext = t.navNext,
		navItem = t.navItem,
		navShowNum = t.navShowNum;
		
	var itemLen=$(navItem+"> .nav-li").length;
	var carouselWidAdd=itemLen*itemWidth;
	var carouselWid=(itemLen-navShowNum)*itemWidth;
	
	$(navItem).css("width",itemLen*itemWidth);
	$(navPrev).hide();
	var nextLeftVal=0, prevLeftVal=0;
	
	
	var resizeFun = function() {
			var winWid = document.documentElement.clientWidth;
			if(winWid > 1230){
				carouselWid = (itemLen-6)*itemWidth;
				if(nextLeftVal > -(itemLen-6)*itemWidth){
					$(navNext).show();
				}else{
					$(navItem).stop().animate({left:-(itemLen-6)*itemWidth+"px"},300);
					nextLeftVal=-(itemLen-6)*itemWidth;
					$(navNext).hide();
				}
			}
			if(winWid < 1230 && winWid > 1000){
				carouselWid = (itemLen-6)*itemWidth;
				if(nextLeftVal > -(itemLen-6)*itemWidth){
					$(navNext).show();
				}else{
					$(navItem).stop().animate({left:-(itemLen-6)*itemWidth+"px"},300);
					nextLeftVal=-(itemLen-6)*itemWidth;
					$(navNext).hide();
				}
			}
			if(winWid < 1000 && winWid > 820){
				carouselWid = (itemLen-4)*itemWidth;
				if(nextLeftVal > -(itemLen-4)*itemWidth){
					$(navNext).show();
				}else{
					$(navItem).stop().animate({left:-(itemLen-4)*itemWidth+"px"},300);
					nextLeftVal=-(itemLen-4)*itemWidth;
					$(navNext).hide();
				}
			}
			if(winWid < 820 && winWid > 720){
				carouselWid = (itemLen-3)*itemWidth;
				if(nextLeftVal > -(itemLen-3)*itemWidth){
					$(navNext).show();
				}else{
					$(navItem).stop().animate({left:-(itemLen-3)*itemWidth+"px"},300);
					nextLeftVal=-(itemLen-3)*itemWidth;
					$(navNext).hide();
				}
			}
			if(winWid < 720){
				carouselWid = (itemLen-2)*itemWidth;
				if(nextLeftVal > -(itemLen-2)*itemWidth){
					$(navNext).show();
				}else{
					$(navNext).hide();
				}
			}
	}
	resizeFun();
	window.onresize = function(){
		resizeFun();
	};
	$(navNext).click(function(){
		nextLeftVal=nextLeftVal-itemWidth;
		prevLeftVal=nextLeftVal;
		if(nextLeftVal > -carouselWidAdd){
			$(navItem).stop().animate({left:nextLeftVal+"px"},300);
			if(nextLeftVal == -carouselWid){
				$(navNext).hide();
			}
			$(navPrev).show();
		}
	});
	$(navPrev).click(function(){
		prevLeftVal=nextLeftVal+itemWidth;
		nextLeftVal=prevLeftVal;
		if(prevLeftVal < itemWidth){
			$(navItem).stop().animate({left:prevLeftVal+"px"},300);
			if(prevLeftVal == 0){
				$(navPrev).hide();
			}
			$(navNext).show();
		}
	});
}

$(function() {
	$("#navCarousel").navslider({
		navNext: '.nav-next',//next标识
		navPrev: '.nav-prev',//prev标识
		navItem: '.nav-item',//内容外部box标识
		navShowNum: 6,//默认展示个数
		itemWidth: 102//菜单宽度
	});
});




