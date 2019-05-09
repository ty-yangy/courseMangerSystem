var express=require('express')
var cookie=require('cookie') 
var bodyParser=require('body-parser');
var categoryModel=require('../../models/categoryModel')
var mysql=require('../../libs/mysql')
var result=require('../../libs/result')
var router=express.Router()
//列表页面业务逻辑开始***
router.get('/list',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/category_list')
    }else{
        res.render('admin/error');
    }   
})
//list页面一加载,立马请求/categoryList
router.get('/categoryList',function(req,res){
    //将数据中的内容显示到当前页面
    categoryModel.getAllCategory(function(data){
        if(data){
            res.json(result.createResult('success',data))
        }else{
            res.json(result.createResult('error',data))
        }
    })
});
//列表页面业务逻辑结束***
//增加分类业务逻辑开始***
//验证分类名是否存在
router.get('/addCategoryName',function(req,res){
    categoryModel.findByName([req.query.name],function(data){
        if(data){
            res.json(result.createResult('error','该分类名称已存在'));
        }else{
            res.json(result.createResult('success','可以添加'));
        }  
    })
})
//验证编号是否存在
router.get('/addCategoryOrder',function(req,res){
    categoryModel.findByOrder([req.query.order],function(data){
        
        if(data){
            res.json(result.createResult('error','该分类编号已存在'));
        }else{
            res.json(result.createResult('success','可以添加'));
        }  
    })
})
//点击提交按钮,保存数据
router.post('/addCategoryInfo',function(req,res){
    var arr=[];
    for(var i in req.body){
        arr.push(req.body[i]);
    }
    categoryModel.addCategory(arr,function(data){
        if(data.insertId){
            res.json(result.createResult('success','恭喜你,添加成功'));
        }else{
            res.json(result.createResult('error','很遗憾,添加失败'));
        }  
    })
})
router.get('/add',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/category_add')
    }else{
        res.render('admin/error');
    }     
})
//增加分类业务逻辑结束***
//编辑课程业务逻辑开始***
//从list页面跳转到edit页面时向edit页面发送需要编辑的这行的信息.
router.post('/editInfo',function(req,res){
    categoryModel.findByName([req.body.name],function(data){
        //找到有相对应的那行的信息,把那行信息显示到edit页面上.
        if(data){
            res.json(result.createResult('success',data.id));
        }else{
            res.json(result.createResult('error','出现错误'));
        }
    })
})
router.post('/getInfoCategoryInitPage',function(req,res){
    //接受前端发送来的数据,查询id所在行,并将查到数据返回给前端 
    categoryModel.findByIdCategory([req.body.id],function(data){
        //找到有相对应的那行的信息,把那行信息显示到edit页面上.
        if(data){
            res.json(result.createResult('success',data));
        }else{
            res.json(result.createResult('error','出现错误'));
        }
    })
})
//保存编辑的分类信息
router.post('/editcategorySave',function(req,res){
    var arr=[];
    for(var i in req.body){
        arr.push(req.body[i]);
    }
    categoryModel.saveEditCategory(arr,function(data){
        if(data.affectedRows){
            res.json(result.createResult('success','恭喜你,编辑成功'));
        }else{
            res.json(result.createResult('error','很遗憾,编辑失败'));
        }  
    })
})
router.get('/edit',function(req,res){
    res.render('admin/category_edit')
})
//编辑课程业务逻辑结束***
//删除分类课程业务逻辑开始***
router.get('/deleteCategory',function(req,res){
    categoryModel.deleteCategory([req.query.name],function(data){
        if(data.affectedRows){
            res.json(result.createResult('success','删除成功'))
        }else{
            res.json(result.createResult('error','删除失败'))
        }
    })
})
//删除分类课程业务逻辑结束***
router.get('/sort',function(req,res){
    res.render('admin/category_list')
})
module.exports=router