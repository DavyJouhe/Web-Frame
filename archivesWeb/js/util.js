/*!========================================================================
 * 工具函数
 * ======================================================================== */
var conf = {
	serverHost : 'http://192.168.2.162:8181/'  // ip域名;
}
 
var util = {
  	init : function(){
	 	this.randomVerSion();
	    // this.checkBrower();
 		return this;
 	},
   isValidIP: function (ip) {
            var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
            return reg.test(ip);         
  },

 	/*
 	  调用方法:*initModalWrap(40,['att_device1.html','att_device2.html'])
      参数说明：lw设置标签头的长度,optionUrl存储调用的路径
      适用范围:IE8以上
      适用条件：必须在locolhsost:下面才可以用
 	*/
 	initModalWrap1:function(lw,optionUrl){
 		     // var menus = {}; //存放APP.includeHtml()的menus选项
 		   
			//根据标签的个数，动态设置ul的长度
			 this.ttModal(lw);
			//表单内容自适应屏幕高度
			var Toptablew=$('.kqTable_content').offset().top;
			var Heightablew=$(document).height()-Toptablew-120;
			$('.kqTable_content').height(Heightablew);
			//初始化默认展示第一个
			 var menus={
        		url:optionUrl[0],
        		container:'#modalFrame',
        		reload: false
                 };
             util.iframeHtml(menus);
			 $('#ttModal li').click(function(){
                  	for(var i=0,len=$('#ttModal li').size();i<len;i++){
                       $('#ttModal li').eq(i).find('span').removeClass('on');
			         }
			         $(this).find('span').addClass('on');
			         var index=$(this).index();
			           for(var j =0;j<optionUrl.length;j++){
                           menus={
                        		url:optionUrl[j],
                        		container:'#modalFrame',
                        		reload: false
                           }
                           if(index==j){
                           	  $("#modalFrame").empty();
                               util.iframeHtml(menus);
                           }
                          
			           }
			         
                  });
             
            
		},
		initModalWrap:function(lw){
 		     // var menus = {}; //存放APP.includeHtml()的menus选项
 		   
			//根据标签的个数，动态设置ul的长度
			 this.ttModal(lw);
			//表单内容自适应屏幕高度
			var Toptablew=$('.kqTable_content').offset().top;
			var Heightablew=$(document).height()-Toptablew-111;   //网站头部+面包屑高度=108
			// $('.kqTable_content').height(Heightablew);
			 $('#ttModal li').click(function(){
                  	for(var i=0,len=$('#ttModal li').size();i<len;i++){
                       $('#ttModal li').eq(i).find('a').removeClass('on');
			         }
			         $(this).find('a').addClass('on');
			          var aurl = $(this).find("a").attr("date-src");
                      var isWh=/\?/.test(aurl);
              	   	  if(isWh){
              	   	 	aurl =aurl+'&v='+Math.random();
              	       }else{
              	   	    aurl =aurl+'?='+Math.random();
              	       }
              	        // 加载到iframe网页
                      $("#TabFrame").attr("src",aurl); 
                      // $("#TabFrame").height(Heightablew);   
                  });
		},
	ttModal:function(lw){

			$('#ttModal').css('width',lw+'%');
			var wd =$('#ttModal').width();
			var labelTtLen=$('#ttModal li').size();
			var liW=100/labelTtLen;
            
            $('#ttModal li').css('width',liW+'%');
		},
 	
	// 获取服务器地址
	getServerUrl : function (path){
		return conf.serverHost + path;
	},
	check360:function(option,value){
        var mimeTypes = navigator.mimeTypes;
        var is360=false,isChrome=false;
             for (var mt in mimeTypes) {
                if (mimeTypes[mt][option] == value) {

                    is360=true;
                 }
               
             }
               var ua = navigator.userAgent.toLowerCase();
                 ua.indexOf("chrome") > 1? isChrome=true:isChrome=false;
              if(is360 && isChrome){
                    return true
                 }else{
                    return false
                 }

          
  },
	//自动加载样式版本号
	randomVerSion : function(){
	 	// var hreflink=document.getElementById('styleCss').href;
	 	// hreflink +='?v='+Math.random();
	 	// $('#styleCss').attr('href',hreflink);	 
	    for(var i=0; i<$('link').length; i++){
	        var hreflink = $('link').eq(i).attr('href');
	        hreflink +='?v='+Math.random();
	        $('link').eq(i).attr('href',hreflink); 
	    }
	},
	
	// 强制用户使用IE8以上的浏览器或者使用谷歌
	checkBrower : function(){
	 	var browser = navigator.appName; 
	    var b_version = navigator.appVersion; 
	    var version = b_version.split(";"); 
	    var trim_Version = version[1].replace(/[ ]/g,""); 
	    if(trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0" || trim_Version == "MSIE8.0") {
    	   	window.location.href="../downLoadBrower.html";
	    }      
	},
	
	// 获取url的参数
	getUrlParam : function(name){
		// happy.com/product/list?keyword = 1&page =10;
		// window.location.search.substr(1) 输出的是keyword = 1&page =10;  
        var reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)' );     // 构造一个含有目标参数的正则表达式对象  
        var	result = window.location.search.substr(1).match(reg);   // 匹配目标参数  
	 	return result ? decodeURIComponent(result[2]) :null;        // decodeURIComponent(result[2]) 是一个参数解码   返回参数值  
	},
	 
	// 渲染html的方法，前提：引入hogan模板引擎
	renderHtml : function(htmlTemplate, data){
		// 先编译
		var template = Hogan.compile(htmlTemplate),
	 	// 再渲染数据
	    result = template.render(data);
	 	return result;	
	},
	 
	// 用iframe标签；
	iframeHtml : function(options){
	 	var options = $.extend(true, {}, options);
        var $div = $('<div/>').attr({
            'data-role' : 'pie'
        });

        if (options.url && options.container) {
            var $container = $(options.container);
            // 过滤：如果不允许重载且该组件已经重载过，则停止异步操作  
            // options.reload = options.reload != undefined ? options.reload : true;
            
            // if (!options.reload && $container.children('div[data-role="pie"]').size() > 0) {
            //     return;
            // }

            // util.loader();

            $.ajax({
                url: options.url,
                type: 'get',
                dataType: 'html',
                data: {},
            }).done(function(response, status, xhr) {
                if (status == 'success') {
                    options.type = options.type ? options.type : 'html';
                    if (options.type == 'prepend') {
                        $container.prepend($div.html(response));
                    } else if (options.type == 'append') {
                        $container.append($div.html(response));
                    } else if (options.type == 'html') {
                        $container.html($div.html(response));
                    }
                    if (options.cb) {
                        options.cb();
                    }
                } else if (status == 'error') {
                    // util.removeLoader();
                }
            })
        } else {
            layer.alert('请求地址异常!');
        }
        var data = (options.data ? options.data : {})
        console.warn('[includeHtml]：' + options.container + '内注入一个pie，pie容器上保存有数据:' + JSON.stringify(data,null,4));
        $div.data('mailbox', data);
	},
      
	loader : function() {
        $('body').append('<div id="loader"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>');
    },
    
    // 异步结束后，清除loading，每次需手动调用方法
    removeLoader: function() {
        $('#loader').remove();
    },

 	// 成功提示
 	successTips : function(msg){
 		layer.alert(msg || '操作成功！');
 	},
	 
	// 错误提示
	errorTips : function(msg){
		layer.alert(msg || '哪里不对了吧！~');
	},
	
	// 字段的验证，支持fei，手机，邮箱
	validate : function(value,type){
	 	var value = $.trim(value);  // 变成字符串类型
	 	// 非空验证
	 	if('require' === type){     // 即必须有值
	 		return !!value;         // 强转成boolean; 即true
	 	}
	 	// 手机号验证
	 	if('phone' === type){
	 		return /^1\d{10}$/.test(value);  // 以1开头，有10位数并以此结尾
	 	}
	 	// 邮箱格式验证
	 	if('email' === type){
	 		return /^1\d{10}$/.test(value);  // 邮箱验证比较复杂，我就不抄了！
	 	} 	
	},
	
	// 含有返回的面包屑
    backBread : function(title){
        var $assbillTt =$(window.parent.document).find("#iframeTitle"); 
        var THtmil ="<a id='goBack'>返回</a>&nbsp;<<span>&nbsp;<span id='childPg'></span></span>";
	    $assbillTt.html(THtmil);
	    $(window.parent.document).find("#childPg").text(title);
    },
    
    // 返回事件
    goBack : function(redirect,redirectTit){
        $(window.parent.document).find("#goBack").on('click',function(){
        	window.location.href = redirect;
            $(window.parent.document).find("#iframeTitle").text(redirectTit);       
        });
    },
    
	// 统一登录处理
	doLogin : function(){      
        layer.confirm('您确定要退出？', {
	            btn: ['是','否'] //按钮
	        }, function(){      
	            window.location.href ='../login.html?redirect=' + encodeURIComponent(window.location.href);//encodeURIComponent(window.location.href)是怕有特殊字符干扰，截断
	            // 重新更新一下enterer
	            // window.location.reload();   // 可以重新请求接口		       
	        }, function(){
	           //do nothing!
        });		
	},
	  //endate开始
    autoAddDay:function(beginDate){
    	
            var endDate;
           	if(beginDate!=""){
            var beginDateArry=beginDate.split('-');
            if(beginDateArry.length ==3){
             var endDateArry =beginDateArry;

            if(endDateArry[2] ==='31'){
            	if(endDateArry[1]==="01" || endDateArry[1]==="03" ||endDateArry[1]==="05"||endDateArry[1]==="07" ||endDateArry[1]==="08" ||endDateArry[1]==="10" ||endDateArry[1]==="12"){
                    endDateArry[2]='01';
                     endDateArry[1]=parseInt(beginDateArry[1])+1;
                     if(endDateArry[1]<10){
                		endDateArry[1] ='0'+endDateArry[1].toString();
                        }
                     if(endDateArry[1]>=13){  //当结束时间为13时，即开始时间为12
                          endDateArry[1]='01';
                          endDateArry[0]=parseInt(beginDateArry[0])+1;  //即加上一年
                     }

            	}
            	// endDate=endDateArry.join('-');

           }else if(endDateArry[2] ==='30'){
             if(endDateArry[1]==="04" ||endDateArry[1]==="06" ||endDateArry[1]==="09"||endDateArry[1]==="11"){
                    endDateArry[2]='01';
                     endDateArry[1]=parseInt(beginDateArry[1])+1;
                     if(endDateArry[1]<10){
                		endDateArry[1] ='0'+endDateArry[1].toString();
                        }
                    

            	}
            	// endDate=endDateArry.join('-');

            } else if(parseInt(endDateArry[2])<30){
               //判断是否为闰年
                 if(endDateArry[1]==="02"){
                    if(endDateArry[2]!='29' && endDateArry[2]!='28' ){
                          endDateArry[2]=parseInt(beginDateArry[2])+1;
                          if(endDateArry[2]<10){
                            endDateArry[2] ='0'+endDateArry[2].toString();
                            }

                          }

                    if (((endDateArry[0] % 4)==0) && ((endDateArry[0] % 100)!=0) || ((endDateArry[0] % 400)==0)) {
                        if(endDateArry[2]==='29'){
                            endDateArry[2]='01';
                            endDateArry[1]='03';
                             // endDateArry[0]=beginDateArry[0];
                             // endDate=endDateArry.join('-');
                             // return endDate;
                        }
                        
                    }else { 
                      //平年有28天
                            if(endDateArry[2]==='28'){
                              endDateArry[2]='01';
                              endDateArry[1]='03';
                              // endDateArry[0]=beginDateArry[0];
                              // endDate=endDateArry.join('-');
                              // return endDate;
                            }
                            
                          }
                      endDate=endDateArry.join('-');
                       return endDate;
                     
                
               }
              
                   endDateArry[2]=parseInt(beginDateArry[2])+1;
                  if(endDateArry[2]<10){
                    endDateArry[2] ='0'+endDateArry[2].toString();
                     }

             }
              endDate=endDateArry.join('-');
             //月份计算
         }else if(beginDateArry.length ==2){
         	 var endMonthArry =beginDateArry;
         	 if(endMonthArry[1]=='12'){
                endMonthArry[1]='01' 
                endMonthArry[0]= parseInt(beginDateArry[0])+1;
         	 }else{
         	 	 endMonthArry[1]= parseInt(beginDateArry[1])+1;
         	      (endMonthArry[1] < 10 ) ? endMonthArry[1] = "0" + endMonthArry[1].toString()  :  tz_m_str  = endMonthArry[1].toString(); 
         	 }
               endDate=endMonthArry.join('-');

         }
             //endate结束
            	 return endDate;
         }
    }

}