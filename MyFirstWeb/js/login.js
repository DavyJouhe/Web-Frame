/* 
* @Author: Jouhe
* @Date:   2018-08-02 17:09:08
* @Last Modified time: 2018-08-02 17:27:19
*/

var login = {
    init:function(){
        this.resetWindow();
        this.bindEvent();
        return this;
    },
    
    IsgetCookie:function(){
        var CookieName = this.getCookie('name');
        var CookiePwd = this.getCookie('password');
        if(!!CookieName && !!CookiePwd){
            $('#user').val(CookieName);
            $('#pwd').val(CookiePwd);
            $('#memory').prop('checked','checked');
        }
        else{
            $('#user').val('');
            $('#pwd').val('');
        }
    },
    
    setCookie:function (name,value){   // 设置cookie
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);      // 10天过期
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    },

    getCookie:function (name){       // 拿到cookie      
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },

    delCookie:function (name){      // 删除cookie
        var exp = new Date();
        // 将时间设置为一个过期时间，就可以删除
        exp.setTime(exp.getTime() - 1);
        var cval=this.getCookie(name);
        if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    },

    // 页面自适应
    resetWindow : function(){
        $('body').height($(document).height());
    },
     
    bindEvent:function(){
        var _this = this;
        // 凸显input输入框
        $('.inputL').mouseenter(function(){
            $(this).addClass('login_inputed').removeClass('login_input');
        }).mouseleave(function () {
            $(this).addClass('login_input').removeClass('login_inputed');
        });                
    },
    
    loginVerify:function(){
        var _this = this;
        $.ajax({
            url: util.urls.cxf.sysuser.verify,                     
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            data:JSON.stringify(_this.GetJsonData()),
            success: function (res) {
                if (res == true){
                    $(window).attr('location','index.html');
                } else {
                    layer.alert('用户名密码错误！');
                }
            },
            error: function (err) {
                layer.alert('连接服务器失败！');
            }
        });
    },
    
    GetJsonData:function(){
        var userName = $.trim($("#user").val());
        var pwd = $.trim($("#pwd").val());
        var jsonObj={
            "name" : userName,
            "password" : pwd
        };  
        return jsonObj;
    }
}

window.onload = login.init();
