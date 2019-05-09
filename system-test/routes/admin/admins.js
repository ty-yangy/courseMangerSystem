var express=require('express')
var cookie=require('cookie');
var router=express.Router()
router.get('/',function(req,res){ 
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/admin');
    }else{
        res.render('admin/error');
    }   
})
module.exports=router