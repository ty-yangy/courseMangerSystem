var express=require('express')
var cookie=require('cookie')
var router=express.Router()
var bodyParser=require('body-parser');
var linkModel=require('../../models/linkModel')
var mysql=require('../../libs/mysql')
var result=require('../../libs/result')
//友情链接列表业务逻辑开始***
router.get('/list',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/link_list')
    }else{
        res.render('admin/error');
    }       
})
//list页面一加载,前端向后端发送请求连接数据库,将数据库中信息加载并显示到前端页面.
router.get('/getLinkList',function(req,res){
    linkModel.getAllLink(function(data){
        if(data){
            res.json(result.createResult('success',data))
        }else{
            res.json(result.createResult('error',data))
        }
    })
})
//友情链接列表业务逻辑结束***
//增加友情链接业务逻辑开始***
router.get('/add',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/link_add')
    }else{
        res.render('admin/error');
    }     
})
//验证链接名称是否存在
router.post('/checkLinkName',function(req,res){
    linkModel.getOneByName([req.body.name],function(data){
        if(data){
            res.json(result.createResult('error','链接名称已存在'))
        }else{
            res.json(result.createResult('success','可以添加'))
        }
    })
})
//验证链接地址是否存在
router.post('/checkLinkAddress',function(req,res){
    linkModel.getOneByAddrsee([req.body.address],function(data){
        if(data){
            res.json(result.createResult('error','链接地址已存在'))
        }else{
            res.json(result.createResult('success','可以添加'))
        }
    })
})
//点击确定提交并保存链接信息
router.post('/addLinkInfo',function(req,res){
    var arr=[];
    for(var item in req.body){
        arr.push(req.body[item]);
    }
    linkModel.addLinkInfo(arr,function(data){
        if(data.affectedRows){
            res.json(result.createResult('success','添加成功'))
        }else{
            res.json(result.createResult('error','出现错误'))
        }
    })
})
//增加友情链接业务逻辑结束***
//友情链接编辑业务逻辑开始***
router.get('/edit',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/link_edit')
    }else{
        res.render('admin/error');
    }       
})
//从list页面跳转到edit页面时向edit页面发送需要编辑的这行的信息.
//将name所在行的id发送到edit页面,edit页面一加载,就根据id找出对应行信息,并显示到edit页面.
router.post('/editLinkInfo',function(req,res){
    linkModel.getOneByName([req.body.name],function(data){
        if(data){
            res.json(result.createResult('success',data.id))
        }else{
            res.json(result.createResult('error','出现错误'))
        }
    })
})
//显示编辑页面
router.post('/editLinkPageInit',function(req,res){
    linkModel.showEditLinkInfo([req.body.id],function(data){
        if(data){
            res.json(result.createResult('success',data))
        }else{
            res.json(result.createResult('error','出现错误'))
        }
    })
})
//保存编辑信息
router.post('/editLinkSave',function(req,res){
    var arr=[];
    for(var i in req.body){
        arr.push(req.body[i]);
    }
    linkModel.saveEditLink(arr,function(data){
        if(data.affectedRows){
            res.json(result.createResult('success','保存成功'))
        }else{
            res.json(result.createResult('error','保存失败'))
        }
    })
})
//友情链接编辑业务逻辑结束***
//删除友情链接业务逻辑开始***
router.post('/deleteLink',function(req,res){
    linkModel.deleteLink([req.body.name],function(data){
        if(data.affectedRows){
            res.json(result.createResult('success','删除成功'))
        }else{
            res.json(result.createResult('error','删除失败'))
        }
    })
})
//删除友情链接业务逻辑结束***
module.exports=router