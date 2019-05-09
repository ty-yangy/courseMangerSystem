var express=require('express')
var cookie=require('cookie')
var router=express.Router()
var bodyParser=require('body-parser');
var navModel=require('../../models/navModel')
var mysql=require('../../libs/mysql')
var result=require('../../libs/result')
//导航列表业务逻辑开始***
router.get('/list',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/nav_list')
    }else{
        res.render('admin/error');
    }   
    
})
router.get('/getNavList',function(req,res){
    //后台连接数据库--->获取数据库中的用户数据--->将获取到的数据显示到前端页面上
    navModel.getAllNav(function(data){
        if(data){
            res.json(result.createResult('success',data))
        }else{
            res.json(result.createResult('error',data))
        }
    })
})
//导航列表业务逻辑结束***
//导航添加业务逻辑开始***
router.get('/add',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/nav_add')
    }else{
        res.render('admin/error');
    }      
})
router.get('/addNavName',function(req,res){
    navModel.findOne([req.query.name],function(data){
        if(data){
            res.json(result.createResult('error','该导航名称已存在'));
        }else{
            res.json(result.createResult('success','可以添加'));
        }  
    })
})
router.get('/addNavAddress',function(req,res){
    navModel.getByAddress([req.query.address],function(data){
        if(data){
            res.json(result.createResult('error','该导航地址已存在'));
        }else{
            res.json(result.createResult('success','可以添加'));
        }  
    })
})
router.post('/addNavInfo',function(req,res){
    var arr=[];
    for(var i in req.body){
        arr.push(req.body[i]);
    }
    navModel.saveNavInfo(arr,function(data){
        if(data.changedRows){
            res.json(result.createResult('success','恭喜你,添加成功'));
        }else{
            res.json(result.createResult('error','很遗憾,添加失败'));
        }  
    })
})
//导航添加业务逻辑结束***
//导航编辑业务逻辑开始***
//接收到前台发送来的数据--->根据发来的数据的导航名称
//从list页面跳转到edit页面时向edit页面发送需要编辑的这行的信息.
router.post('/editInfo',function(req,res){
    navModel.findOne([req.body.name],function(data){
        //找到有相对应的那行的信息,把那行信息显示到edit页面上.
        if(data){
            res.json(result.createResult('success',data.id));
        }else{
            res.json(result.createResult('error','出现错误'));
        }
    })
})
//接收list页面的数据后将该数据查询到的导航信息显示到初始页面上.
router.post('/editNavPageInit',function(req,res){
    //接受前端发送来的数据,查询id所在行,并将查到数据返回给前端
    navModel.findIdNav([req.body.id],function(data){
        //找到有相对应的那行的信息,把那行信息显示到edit页面上.
        if(data){
            res.json(result.createResult('success',data));
        }else{
            res.json(result.createResult('error','出现错误'));
        }
    })
})
//编辑导航信息并保存
//接受前端发来的数据并保存--->将保存结果返回.
router.post('/editNavSave',function(req,res){
    var arr=[];
    for(var i in req.body){
        arr.push(req.body[i]);
    }
    navModel.editNav(arr,function(data){
        if(data.changedRows){
            res.json(result.createResult('success','恭喜你,编辑成功'));
        }else{
            res.json(result.createResult('error','很遗憾,编辑失败'));
        }  
    })
})
router.get('/edit',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/nav_edit')
    }else{
        res.render('admin/error');
    }    
})
//导航编辑业务逻辑结束***
//导航删除业务逻辑开始***
router.post('/deleteNav',function(req,res){
    navModel.deleteOneNav([req.body.name],function(data){
        if(data.affectedRows){
            res.json(result.createResult('success','删除成功'))
        }else{
            res.json(result.createResult('error','删除失败'))
        }
    })
})
//导航删除业务逻辑结束***
router.get('/show',function(req,res){
    res.render('admin/link_list')
})
router.get('/sort',function(req,res){
    res.render('admin/link_add')
})
router.get('/set',function(req,res){
    res.render('admin/link_edit')
})

module.exports=router