$(function(){
    var cookie_obj=Cookies.get();
    console.log(cookie_obj)
    if(cookie_obj.isLogin=='true' && cookie_obj.roles=='guest'){
        //普通用户登录时:隐藏登录注册按钮  显示问候框等.
        $('.loginSign').hide();
        $('.isLogin').show();
        $('.toadmin').hide();
    }else if(cookie_obj.isLogin=='true' && cookie_obj.roles=='adminstrator'){
        //管理员登录时:显示登录注册按钮  隐藏问候框等.  添加一个跳转到后台管理系统的链接.
        $('.loginSign').hide();
        $('.isLogin').show();
        $('.toadmin').show();
    }else{    
        $('.loginSign').show();
        $('.isLogin').hide();  
    }
    //点击logoutBtn,退出登录,并将cookie清除掉,并跳转到登录页.
    $('.logoutBtn').click(function(){
        Cookies.remove('isLogin');
        Cookies.remove('roles');
        //并且退回到登录页面
        window.location.href="/login";
    })
})