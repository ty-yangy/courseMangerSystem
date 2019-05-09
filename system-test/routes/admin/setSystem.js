var express=require('express')
var cookie=require('cookie');
var bodyParser=require('body-parser');
var setSystemModel=require('../../models/setSystemModel')
var mysql=require('../../libs/mysql')
var result=require('../../libs/result')
var router=express.Router()
router.get('/',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/system_config')
    }else{
        res.render('admin/error')
    }   
})
//页面加载时立即获得设置信息并显示到页面
router.get('/getSystemInfo',function(req,res){
    setSystemModel.getSetSystemInfo(function(data){
        if(data){
            res.json(result.createResult('success',data))
        }else{
            res.json(result.createResult('error','出现错误'))
        }
    })
})
//提交并保存编辑信息
router.post('/saveEditSetInfo',function(req,res){
    var arr=[];
    for(var item in req.body){
        arr.push(req.body[item]);
    }
    setSystemModel.saveEditSetInfo(arr,function(data){
        if(data.affectedRows){
            res.json(result.createResult('success','编辑成功'))
        }else{
            res.json(result.createResult('error','出现错误'))
        }
    })
})
module.exports=router