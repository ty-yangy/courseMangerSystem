var express=require('express')
var cookie=require('cookie')
var router=express.Router()
var bodyParser=require('body-parser');
var mysql=require('../../libs/mysql')
var userModel=require('../../models/userModel')
var result=require('../../libs/result')
router.get('/list',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/user_list');
    }else{
        res.render('admin/error');
    }   
})
//显示用户列表业务逻辑***
router.get('/getUserList',function(req,res){
    //后台连接数据库--->获取数据库中的用户数据--->将获取到的数据显示到前端页面上
    userModel.getAllUser(function(data){
        if(data){
            res.json(result.createResult('success',data))
        }else{
            res.json(result.createResult('error',data))
        }
    })
    //res.render('admin/user_list');
})
//显示用户列表业务逻辑结束***
//添加用户业务逻辑***
router.get('/add',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/user_add');
    }else{
        res.render('admin/error');
    }    
})
router.get('/addUserEmail',function(req,res){
    //添加用户时同样需要检查邮箱是否存在
    userModel.findOne(req.query.email,function(data){
        if(data){
            res.json(result.createResult('error','用户已存在'));
        }else{
            res.json(result.createResult('success','可以注册'));
        }   
    })
})
//点击确定,发送数据到后台,并保存数据到数据库
router.post('/addUserInfo',function(req,res){
    var arr=[];
    for(var i in req.body){
        arr.push(req.body[i]);
    }
    //先查询数据库中是否有这个邮箱,有的话则不可以注册,没有的话才将信息存入
    userModel.findOne(arr[0],function(data){
        if(data){
            res.json(result.createResult('error','很遗憾,添加失败'));
        }else{
            userModel.saveData(arr,function(data){
                if(data){
                    res.json(result.createResult('success','恭喜你,添加成功'));
                }else{
                    res.json(result.createResult('error','很遗憾,添加失败'));
                }  
            })
        }   
    }) 
    
})
//添加用户业务逻辑结束***
//修改用户具体业务逻辑***
router.get('/edit',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/user_edit');
    }else{
        res.render('admin/error');
    }     
})
//接收到前台发送来的数据--->根据发来的数据的邮箱
//从list页面跳转到edit页面时向edit页面发送需要编辑的这行的信息.
router.post('/editInfo',function(req,res){
    userModel.findOne([req.body.email],function(data){
        //找到有相对应的那行的信息,把那行信息显示到edit页面上.
        if(data){
            res.json(result.createResult('success',data.id));
        }else{
            res.json(result.createResult('error','出现错误'));
        }
    })
})
//edit页面做的具体业务逻辑
//页面刚开始加载时,根据list页面发送的email获取对应用户的信息并显示在页面中
router.post('/editUserPageInit',function(req,res){
    userModel.findById([req.body.id],function(data){
        if(data){
            res.json(result.createResult('success',data[0]));
        }else{
            res.json(result.createResult('error','出现错误'));
        }
    })
})
//--->进行编辑点击确认后再将编辑后的信息存入到数据库中,显示列表页.
router.post('/editUserSave',function(req,res){
    var arr=[];
    for(var i in req.body){
        arr.push(req.body[i]);
    }
    //console.log(arr);
    userModel.updateUserInfo(arr,function(data){
        if(data.changedRows){
            res.json(result.createResult('success','恭喜你,编辑成功'));
        }else{
            res.json(result.createResult('error','很遗憾,编辑失败'));
        }  
    })
})
////寻找除当前id以外的邮箱,后台将查询结果返会给前端-->前端和输入的邮箱作比较;
//如果和输入的邮箱相同,则不能修改,需更换.如果不一样,则可以更改为这个输入的邮箱.
router.post('/getUserEmailNum',function(req,res){
    userModel.findAllByEmail([req.body.id],function(data){
        if(data){
            res.json(result.createResult('success',data.email));
        }else{
            res.json(result.createResult('error','出现错误'));
        }
    })
})
//修改用户业务逻辑结束***
//修改密码业务逻辑开始***
router.get('/edit_pass',function(req,res){
    var cookie_obj = cookie.parse(req.headers.cookie || '');
    //在此处还需检测这个username对应的用户的身份是不是管理员,如果不是的话再设置权限
    if(cookie_obj.roles==='adminstrator'){
        res.render('admin/user_password_edit');
    }else{
        res.render('admin/error');
    }     
})
router.post('/editUserPass',function(req,res){
    var arr=[];
    for(var i in req.body){
        arr.push(req.body[i]);
    }
    //console.log(arr);
    userModel.editUserPass(arr,function(data){
        if(data.changedRows){
            res.json(result.createResult('success','恭喜你,编辑成功'));
        }else{
            res.json(result.createResult('error','很遗憾,编辑失败'));
        }  
    })
})
//修改密码业务逻辑结束***
//删除用户业务逻辑***
router.post('/deleteUser',function(req,res){
    userModel.deleteOneUser([req.body.email],function(data){
        if(data.affectedRows){
            res.json(result.createResult('success','删除成功'))
        }else{
            res.json(result.createResult('error','删除失败'))
        }
    })
})
//删除用户业务逻辑结束***
module.exports=router;