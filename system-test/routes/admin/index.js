var express=require('express');
var router=express.Router();
var path=require('path');
var cookie=require('cookie');
var bodyParser=require('body-parser');
//引入路由
var admins=require('./admins');
var user=require('./user');
var category=require('./category');
var course=require('./course');
var link=require('./link');
var nav=require('./nav');
var setSystem=require('./setSystem');
router.use(bodyParser.urlencoded({extend:false}));
//使用路由
router.use('/admins',admins);
router.use('/user',user);
router.use('/category',category);
router.use('/course',course);
router.use('/link',link);
router.use('/nav',nav);
router.use('/setSystem',setSystem);
router.get('/',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/index');
    }else{
        res.render('admin/error');
    }   
})
module.exports=router;
