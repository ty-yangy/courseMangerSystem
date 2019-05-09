var express=require('express');
var router=express.Router();
var bodyParser=require('body-parser');
var cookie=require('cookie');
var userModel=require('../../models/userModel');
var result=require('../../libs/result');
router.use(bodyParser.urlencoded({extend:false}));
router.get('/foundation',function(req,res){
    res.render('home/foundation');
})
router.get('/fullStack',function(req,res){
    res.render('home/fullStack');
})
router.get('/login',function(req,res){
    res.render('home/login');
})
//登录业务逻辑开始***
router.post('/getLogin',function(req,res){
    //req.body
    var arr=[];
    for(var i in req.body){
        arr.push(req.body[i]);
    }
    //在数据库中查询用户名和密码是否正确
    userModel.findUseInfo(arr,function(data){  
        if(data.length==0){     
            res.json(result.createResult('error','用户名或密码错误'));  
        }else if(data[0].role==='guest'){
            //登录成功的时候需要设置一个cookie:isLogin 带回到浏览器(这个cookie通过jquery在前端设置)
            res.setHeader('Set-Cookie', cookie.serialize('roles', "guest"));
            res.json(result.createResult('success','欢迎登录'));
        }else if(data[0].role==='adminstrator'){
            res.setHeader('Set-Cookie', cookie.serialize('roles', "adminstrator"));
            //res.cookie("account",{username:arr[0],roles:'guest',isLogin:true});    
            res.json(result.createResult('success','欢迎来到后台管理系统'));
        }
    })
})
//登陆业务逻辑结束***
router.get('/mobile',function(req,res){
    res.render('home/mobile');
})
router.get('/progress',function(req,res){
    res.render('home/progress');
})
router.get('/register',function(req,res){
    res.render('home/register');
})
//注册业务逻辑开始***
//查询邮箱是否存在
router.get('/getuser',function(req,res){
    //后天接收到前端发送来的数据--->拿到数据库中进行比对
    //-->返回数据库中的比对结果--->将结果返回给前端
    //查询数据库,我们希望有一个查询数据的方法可以直接供我们调用
    //创建一个userModel的变量,存放和用户相关的数据处理
    //req.query中存放着前端发送来的请求数据
    //先引用userModel这个变量操作数据
    userModel.findOne(req.query.email,function(data){
        if(data){
            res.json(result.createResult('error','用户已存在'));
        }else{
            res.json(result.createResult('success','可以注册'));
        }   
    })
})
//点击注册,发送数据到后台,并保存数据到数据库
router.post('/getRegister',function(req,res){
    // 接收post数据，我们可以使用一个叫做body-parser的模块来帮我们完成
    //将接收到的数据存入到数据库中
    //res.send(req.body);
    //console.log(req.body);
    //{email: '846051626@qq.com',password: '123',status: '1',role: 'guest',
    //create_time: '2019年4月28日'}
    // req.body是一个对象,将它的每个属性值取出,放入到一个数组中,将这个数组作为参数传入saveOne中
    var arr=[];
    for(var i in req.body){
        arr.push(req.body[i]);
    }
    //先查询数据库中是否有这个邮箱,有的话则不可以注册,没有的话才将信息存入
    userModel.findOne(arr[0],function(data){
        if(data){
            res.json(result.createResult('error','很遗憾,注册失败'));
        }else{
            userModel.saveData(arr,function(data){
                if(data){
                    res.json(result.createResult('success','恭喜你,注册成功'));
                }else{
                    res.json(result.createResult('error','很遗憾,注册失败'));
                }  
            })
        }   
    }) 
    
})
//注册业务逻辑结束***
router.get('/senior',function(req,res){
    res.render('home/senior');
})
router.get('/strengthen',function(req,res){
    res.render('home/strengthen');
})
//退出登录业务逻辑开始
//router.get('/logout',function(req,res){
//    
//})
module.exports=router;