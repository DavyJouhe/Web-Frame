window.addEventListener("load",initAll,false);

function initAll() {
	var allLinks = document.getElementsByTagName("a");
                   //遍历所有a标签
	for (var i=0; i<allLinks.length; i++) {
		if (allLinks[i].className.indexOf("menuLink") > -1) {			   //找到所有menuLink
			allLinks[i].addEventListener("click",toggleMenu,false);
		} 
	}
}

function toggleMenu(evt) {
	var twoLayerl=$('.menuLink').size();
	//初始化一级菜单开始
	 for(var j=0; j<twoLayerl; j++){
           var _id =$('.menuLink').eq(j).next().attr('id');
           $('#'+_id).removeAttr('style');
           $('.menuLink').eq(j).find('span').removeAttr('style');
          var aLSrc=$('.menuLink').eq(j).find('img').attr('src');
          if(aLSrc.indexOf('_selected')>-1){
            var newaLSrc=index.deleStr(aLSrc,'_selected');
            $('.menuLink').eq(j).find('img').attr('src',newaLSrc);
          }
          
    }
    //初始化一级菜单结束
    //初始化首页样式开始
	$('#homeF').removeAttr('style');
	$('#homeF span').removeAttr('style');
	var imgSrc =$('#homeF img').attr('src');
	debugger
	var NewimgSrc=index.deleStr(imgSrc,'_selected');

	$('#homeF img').attr('src',NewimgSrc);
	//初始化首页样式结束
	//展开一级菜单的样式开始
	var thisSrc=$(this).find('img').attr('src');
	var newThisSrc=index.insertStr(thisSrc,'_selected');
	$(this).find('img').attr('src',newThisSrc);
	$(this).find('span').css('color',' rgb(42, 148, 222)');
	//展开一级菜单的样式结束
	var startMenu = this.href.lastIndexOf("/")+1;
	var stopMenu = this.href.lastIndexOf(".");
	var thisMenuName = this.href.substring(startMenu,stopMenu);
	var thisMenuStyle = document.getElementById(thisMenuName).style;
	if (thisMenuStyle.display == "block") {	
		thisMenuStyle.display = "none";
	}
	else {
		thisMenuStyle.display = "block";
		//初始化二级菜单的原始样式
		 $('#'+thisMenuName).find('a').css('background','#37424f');
		 $('#'+thisMenuName).find('a').find('span').css('color','#fff');
		 //点击事件
		 $('#'+thisMenuName).find('a').click(function(){
		 	  var ileng = $('#'+thisMenuName).find('a').size();
		 	   for(var i=0;i<ileng;i++){
                    $('#'+thisMenuName).find('a').eq(i).css('background','#414D5C');
                    $('#'+thisMenuName).find('a').eq(i).find('span').css('color','#fff');
		 	   }
              $(this).css('background','#fff').siblings().css('background','#37424f');
              $(this).find('span').css('color','#2A94DE');
		 });
        
         
       
	}	
	evt.preventDefault();
}


 
  