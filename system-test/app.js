var express=require('express');
var app=express();
var config=require('config-lite')(__dirname);
var package=require('./package.json');
var path=require('path');
//引入前端路由
var home=require('./routes/home');
//引入后端路由
var admin=require('./routes/admin');
var ejs=require('ejs');
//使用前端路由
app.use('/',home);
//使用后端路由
app.use('/admin',admin);
//引入模板引擎
app.use(express.static(path.resolve('./public')));
app.set('engine views',path.resolve('views'));
app.engine('html',ejs.__express);
app.set('view engine','html');
app.get('/',function(req,res){
    res.render('home/index');
})
app.listen(config.port,function(err){
    console.log(`${package.name}listening on ${config.port}`);
})