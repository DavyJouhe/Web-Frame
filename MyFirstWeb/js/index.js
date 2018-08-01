$(".nav").on("click","li",function(){
	$(this).siblings().removeClass("current");
	var hasChild = !!$(this).find(".subnav").size();
	if(hasChild){
		$(this).toggleClass("hasChild");
	}
	$(this).addClass("current");
});


$(window).resize(function(e) {
    $("#bd").height($(window).height() - $("#hd").height() - $("#ft").height()-6);
	$(".wrap").height($("#bd").height()-6);
	$(".nav").css("minHeight", $(".sidebar").height() - $(".sidebar-header").height()-1);
	$("#iframe").height($(window).height() - $("#hd").height() - $("#ft").height()-12);
}).resize();

$(".nav>li").css({"borderColor":"#dbe9f1"});
$(".nav>.current").prev().css({"borderColor":"#7ac47f"});
$(".nav").on("click","li",function(e){
	var aurl = $(this).find("a").attr("date-src");
	$("#iframe").attr("src",aurl);
	$(".nav>li").css({"borderColor":"#dbe9f1"});
	$(".nav>.current").prev().css({"borderColor":"#7ac47f"});
	return false;
});

$('.exit').click(function(){
	
});


function switchSysBar(){ 
	var locate=location.href.replace('index.html','');
	var ssrc=document.all("img1").src.replace(locate,'');
	if (ssrc == "img/toleft.png") {
	    document.all("img1").src = "img/toright.png";
	    document.all("frmTitle").style.display = "none";
	    } 
	else{ 
	    document.all("img1").src="img/toleft.png";
	    document.all("frmTitle").style.display = "";
	    }
}

function home() {
	document.all("iframe").src = "homepage.html";
}