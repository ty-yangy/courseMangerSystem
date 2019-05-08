# courseMangerSystem
这是我学习表达时做的一个练习的小作业，记录一下
这里主要记录项目的思路及遇到的问题以及如何解决
一.静态文件编辑(html+css+javascript)
二.项目结构搭建
    1.项目名称:system-test
    2.创建文件夹:
        (1)routes文件夹存放路由访问相关的的node文件,其中admin存放后台相关,home存放前台相关
        (2)views存放静态页面html文件,同同样包含两个文件夹admin和home
        (3)pubic中存放需要加载的静态文件,例如css文件,img图片,js文件等.同样文为admin和home两个文件夹
        (4)入口文件:app.js
    3.进行npm的初始化
        npm init -y
        这步执行完会生成一个package.json文件夹
        !!!<img src="新增json.jpg"/>
    4.安装express:建议安装版本为4.16.4
        npm instsll express@4.16.4 -S
        !!!<img src="安装express.jpg"/>
    5.写app.js测试环境是否搭建成功
        (1)引入express
        (2)创建一个express的实例.
        (3)监听端口
    6.安装nodemon 无数中心自动运行node.js
        npm install nodemon --save
    7.创建一个config文件夹,专门存放配置文件,default.js
        default.js中的代码如下:
        module.exports={
            port:4000
        }
        因为一般在实际开发中,会有不止一个配置环境,包括测试环境,上线环境,等等.不管项目大小,比较好的一个做法是
        将配置文件和代码分离,通常我们会把配置信息写到一个配置文件里去,例如default.js
        实际项目中,由于配置文件比较多,我们需要很方便地去读取这些配置文件里面的内容
        所以需要一个npm包帮助我们读取配置文件中的内容,这是就需要用到config-lite这个包
        下载config-lite这个包: npm install config-lite --save
        会默认读取config下的deault.js
    8.引入配置文件
        var config=require('config-lite')(__dirname);  会默认引入default.js
    9.引入package.json
        app.js中的代码如下:
        var express=require('express');
        var app=express();
        var config=require('config-lite')(__dirname);
        var package=require('./package.json');
        app.get('/',function(req,res){
            res.send('你好');
        })
        app.listen(config.port,function(err){
            if(!err){
                console.log(`${package.name}`listening on ${config.port});
            }
        });
    10.进行前端路由分发routes/home/index.js
    11.引入静态文件
        (1)静态文件的配置
        引入中间件 path   利用express.static()来加载静态文件
        var path=require('path');
        加载内置静态文件的中间件  localhost:4000/相当于直接指向了public,
        里边传入一个静态文件得绝对路径,通过path包将相对路径转为绝对路径.
        app.use(express.static(path.resolve('./public')));
        (2)渲染静态页面
        需引入ejs引擎来加载静态文件
            a.下载ejs引擎模块  npm install ejs --save
            b.引入ejs  var ejs=require('ejs');
            b.引入ejs模板引擎  app.set('engine views',path.resolve('views'))
            c.告诉express使用ejs来作为模板引擎使用,并且将模板文件后缀设置为html
            app.engine('html',ejs.__express)
            d.设置模板引擎app.set('view engine','html')
            //此时发送local host:4000/请求,html页面可以加载出来,但css,js,图片等文件均无法加载
            则需要更改html中css等的路径.
            <img src="无css.jpg"/>
        (3)更改css,js,图片等文件路径
        (4)html页面中有公用的部分,将公用的部分抽离
        home中将header和footer部分抽离成public-header.html 和 public-footer.html文件,再利用模板引擎,引入各个页面中.
            <%- include('public-header.html')%>
            <%- include('public-footer.html')%>
    12.路由规划:
            (1)前端home/index.js,代码如下:
                    var express=require('express');
                    var router=express.Router();
                    router.get('/foundation',function(req,res){
                        res.render('home/foundation');
                    })
                    router.get('/fullStack',function(req,res){
                        res.render('home/fullStack');
                    })
                    router.get('/login',function(req,res){
                        res.render('home/login');
                    })
                    router.get('/mobile',function(req,res){
                        res.render('home/mobile');
                    })
                    router.get('/progress',function(req,res){
                        res.render('home/progress');
                    })
                    router.get('/register',function(req,res){
                        res.render('home/register');
                    })
                    router.get('/senior',function(req,res){
                        res.render('home/senior');
                    })
                    router.get('/strengthen',function(req,res){
                        res.render('home/strengthen');
                    })
                    module.exports=router;
            (2)后端路由规划:
            后端总共分为6个模块:用户模块user,导航模块nav,友情链接模块link,
            系统设置模块setSystem,分类管理模块category,课程管理模块course
            文件夹设置如下:
            <img src="后台路由.jpg"/>
            (3)后台:修改静态文件路径
            (4)抽离公共页面
    13.设计数据库
        (1)新建一个数据库  new DataBase
        (2)建好数据库就需要创建表,以user模块为例设计数据表结构
        包含数据:id,username,password,status:表示是否是禁用状态,0是1,否,
        role(是否具有管理员权限,管理员才能登录admin),create_time(注册的时间)
三.业务流程分析:
    1.套路:
    (1)在前端页面发起请求:
    a(href)
    img(src)
    link(href)
    script(src)
    以上这些一般发送的都是get请求,当页面加载时会主动发送请求.
    这些都属于静态文件的加载,一般都是通过static去完成的.

    form
    ajax
    当我们认为的去发送一些请求时,就会用到这两种,可以发送get和post请求.
    (2)后端接受请求并处理
        接受前端的请求:
        处理请求一:直接去返回相关资源
        处理请求二:连接数据库,拿到数据,操作数据
        通常都是在路由中处理请求的.
四.具体业务逻辑处理:

操作数据库前需要先连接数据库:
(1)安装数据库引擎: npm install mysql --save
(2)连接数据库:connection
传统的连接数据库是在出口文件app.js中利用connection进行数据库连接的,这种方式下,服务器每发送一次
请求就会连接一次数据库,包括请求静态文件资源时,这样是一种资源的浪费.因为前后端都有可能需要处理数据,
会多出用到数据库,需要多处连接,因此产生了一种优化的思想,采用MVC分层技术.
//MVC分层
M:Model  处理数据   专门用来和数据打交道
V:views  视图层     专门用来渲染视图
controller 控制层   做路由的分发,决定什么时候连接数据库,什么时候渲染试图等.

新建一个libs存放库:
(1)里边有一个mysql.js--->处理相关的数据库连接
(2)sql语句的拼接有些麻烦,为了引起不必要的错误,所以我们将sql语句相关的代码抽离出来,在libs中新建
    一个userSqlMap.js的文件,存放user相关的sql语句.
    userSqlMap:与用户模块相关的sql语句
(2)//为了使返回的消息格式固定,我们创建一个公共的库专门处理返回消息.
    result.js:存放结果相关的变量
(3)连接数据库:
    a.引入mysql中的引擎mysql:   var mysql=require('mysql');
    b.配置数据库:配置文件在config中.
        mysql:{
            host:'localhost',
            user:'root',
            password:'root',
            database:'system-tset'
        }
    c.使用配置文件:在mysql.js中使用配置文件
建一个models:存放有关数据处理的,包含userModel.js--->专门处理用户相关联的数据库,linkModel.js等等.
这样就需要在前台的index.js中引入userModel.


1.注册功能:
验证邮箱是否可以注册:判断标准就是查询邮箱是否在数据库中存在,不存在则可以注册
流程:用户输入邮箱--->前端页面发送请求--->把邮箱数据发送到后台--->后台接收到前端发来的请求
--->后台发送到数据库进行比对--->数据库返回查询结果--->返回给node--->把消息返回给前端页面
实现逻辑:输入用户名,失去焦点后就发送请求,blur事件.
前端发送数据代码如下:
<script>
	$(function(){
		//注册功能逻辑:用户输入邮箱失去焦点后,先判断输入内容是否为空,如果为空则提示.
		//如果不为空,则需将输入的邮箱内容发送到后台-->后台接收前端发送的数据-->后台将接收到的数据
        //放到数据库中进行比对-->查询是否存在,若存在,则不可以注册,反之,可注册.
		$('#email').blur(function(){
			if($('#email').val()){
				//将用户输入内容发送到后台
				$.get('/getuser',{email:$('#email').val()},function(result){
					if(result.success==='error'){
						$('.message-email').html(result.data).css('color','red');
					}else{
						$('.message-email').html(result.data).css('color','green');
					}
				},'json');
			}else{
				$('.message-email').html('用户名不能为空').css('color','red');
			}
		})
	})
</script>
点击注册按钮,发送数据到后台,这是使用post方式发送
使用post方式发送,需要用到一个中间件body-parser.
1.安装body-parser这个模块
npm install body-parser --save
2.引入这个模块
var bodyParser=require('body-parser);
router.use(bodyParser.urlencoded({extend: false}));
3.获取数据
router.post('/login', function (req, res) {
  res.send(req.body.user)
})
//insert into admin (username,password)value('jiayan',123456)
//insert into 表名 (字段1,字段2,...)value(值1,值2，...);
//insert into user (email,username,password,status,role,create_time)value(?,?,?,?,?,?)
//var sql='SELECT *FROM admin WHERE username="'+user_data.username+'" AND password="'+user_data.password+'"';


解决问题1:
用户禁用状态下按钮样式的设置:
激活状态:
$(oTd).html('<button class="btn btn-xs btn-success"><i class="icon-ok bigger-120 success"></i></button>');
禁用状态:
$(oTd).html('<button class="btn btn-xs btn-danger"><i class="icon-remove bigger-120 danger"></i></button>');

解决问题2:
前台页面登录后右上角显示登录状态,并隐藏 登录|注册 按钮
方案1:在登录时给所有用户设置cookie:isLogin  和cookie:身份 --->不可行,因为同时设置两个cookie第一个cookie会被覆盖掉
方案2:注册时给用户设置一个名为role的cookie用来存储身份(管理员(adminstrator)还是访客(guest))默认为访客  登录成功后给所有人设置cookie:isLogin为true.  
      登录前还需要向后台发送请求找到所有的adminstrator给他们设置上名为role的cookie,adminstrator.   失败原因:注册完后登录以后,所有的都会带上role:guest的cookie
方案3:根据role的值是否为空判断是否显示用户问候界面.并展示一个可退出登录的按钮,退出后清除cookie.
后台页面退出后应该跳转到前台登录页面,并清除cookie  成功.

关于课程管理系统项目(下)
最近终于勉勉强强把我的这个小练习做完了,虽然简单,但是过程也是磕磕绊绊,第一次自己做这种前后端结合的小项目.
有问题也都是靠度娘,所以做的略艰辛.现将项目的前后端模块的功能,实现思路以及遇到问题以及如何解决的问题进行下
总结.避免重复出现问题,如果出现了问题,希望对解决问题有所帮助.

前面提到过项目分为后台模块和前台模块,因为是在本地服务器4000端口上部署的项目,所以访问localhost:4000可直接访问前台首页.
先说前台模块:主要包含登录功能,注册功能,显示各分类下的课程
1.注册功能:需要对各输入框进行验证,保证输入内容不能为空,注册邮箱不能重复(需通过ajax向后台发送请求,再向数据库中查询该邮箱是否已经存在),密码和确认密码需一致,在验证
未通过的情况下需要将确定按钮设为禁用状态,并显示提示信息.通过时,将确定按钮恢复为可用状态,并清空提示信息.
!!!因为管理员才能进入后台系统,因此,我将注册的用户默认都设置为普通用户(guest),我在数据库中提前存储了一个用户信息,并将其设为管理员(adminstrator).
2.登录功能:需要进行各项验证(原理同上),此处省略,心累,不想写...
因为该项目既有前台页面,又有后台页面,前面说过项目是在本地服务器上部署的,所以通过localhost:4000即可以访问,因此也就意味着想要访问后台系统的页面可以通过
localhost:4000/admin/就可以访问后台系统的首页.这样不是我们预期的效果.因此在登录时设置一个名为roles的cookie,如果登录的角色是guest,roles的值为'guest',
如果登录的是管理员,则将roles的值设为'adminstrator',同时在后台模块admin下,接收请求时,如果cookie的roles值为'adminstrator'才有权限访问,否则没有权限访问后台系统.
同时,管理员登录后会有一个选项选择前往后台管理系统或前台页面.
再来说后台模块,包含的部分及功能如下图所示.
<img src="admin模块功能图.jpg">
1.用户模块user:主要包括五个功能:
(1)显示列表
(2)删除用户信息
(3)编辑用户信息
(4)添加用户信息
(5)修改用户密码
其中删除功能和编辑功能都是在列表页面进行操作的.
如图:<img src="userlist">
a.显示list实现功能:user_list页面加载时,立刻向后台发送一个请求,查询数据库中表名为user的用户信息,将所有信息显示到前台页面.
b.删除功能:点击表格中的某一行中的删除按钮--->前端会根据所点击的按钮获得所在行用户信息的username,前端根据得到的username向
后台请求该username所在行的数据,并将数据库中该条信息删除,然后跳转到list页面.
!!!注意:本来将序号那一列设置为id值的话,删除后,序号值就不连续,因此在list页面更新的时候增加一个index值,循环一次,index自增一次,这样序号就同步了.
c.编辑功能:在list页面中点击表格中某一行的编辑按钮--->前端根据所点击行的email值向后台发送一个请求--->后台根据这个email值查询email所在
行的用户信息的id---->后台把这个id返回给前端(这时接收到id信息的是list页面)--->list页面跳转到edit页面时将id传值给edit页面--->
edit页面接收到list传来的id值--->根据所给id向后台发送请求--->后台链接数据库并在数据库中查找该id值对应的用户信息--->
后台将查到的用户细腻些返回给前端--->前端将这些信息显示到页面上---->用户编辑信息后,点击提交按钮--->前端将这些数据发送给后台,包括id信息-->
后台根据id信息将这些数据保存到数据库中--->保存成功后结果返回给后台--->后台将结果返回给前端--->前端做相应处理,成功则跳转至list页面.
(!!!注意:编辑信息提交前可进行相应的信息验证,以确保提交时数据都不为空,否则将导致sql查询语句错误,而使代码报错无法正常运行.)
!!!!还要注意:编辑时,还需验证修改后的邮箱在数据库中是否已经存在--->寻找除当前id以外的邮箱,后台将查询结果返会给前端-->前端和输入的邮箱作比较;
如果和输入的邮箱有相同,则不能修改,需更换.如果不一样,则可以更改为这个输入的邮箱.
d.添加功能:需要对输入框和选择框进行验证,确保不为空.用户名和邮箱都不能重复(须向后台发送数据查询数据库中是否存在该username),密码和确认密码需一致
验证未通过时需要将确定按钮设置为禁用状态,同时还需设置提示信息,通过以后再将按钮恢复为可用状态并取消提示信息.--->验证成功后收集用户输入
信息并发送至后台--->后台接收数据后并将其存入数据库中--->保存结果返回到前端--->前端进行相应的处理--->跳转到list页面.
d.修改密码功能:验证输入的用户名是否存在,验证密码予确认密码是否不为空且输入一致,验证完成后点击确定后将信息发送到后台--->后台接收到数据,根据所
输入的用户名替换掉对应的password,然后前端做相应处理.
2.注意导航模块(nav),课程分类模块,友情链接模块,课程管理模块功能基本相似.唯一有区别的是,课程管理模块的课程分类中的下拉选择框的选项option是
根据课程分类中的分类名称确定的.课程管理中编辑课程时,初始显示的课程状态也是根据这个课程名称向classify表中发送数据,查询到该课程名所属的课程
类别而确定的.
3.系统设置模块就跟任一模块的编辑功能类似.
后端模块的实现基本就结束了.
上边基本上已经实现了我们整个项目的所有功能,还有一些功能需要实现
因为用户登录后,页面顶部的登录|注册按钮就应该隐藏,同时右上角要出现问候语,思路和对设置权限一样,设置一个cookie,当登录以后设置一个名为isLogin的co
okie,登录成功后设置isLogin值为true.isLogincookie是利用jquery的cookie插件设置的
设置cookie:Cookies.set('isLogin', 'true');登陆成功后带有isLogin  且值为true的cookie时,页面顶部登陆注册按钮隐藏,显示一个登录后的问候信息.
同时cookie名为roles的值为adminstrator的页面会增加一个链接到后台管理系统的按钮.
前端获取cookie值:Cookies.get();   得到的结果是一个对象
!!!注意:可以在后台登录验证成功时设置一个cookie对象,cookie中包含登陆的用户名,这样就可以在访问网页过程中显示登录的用户名,其实,前端也可以设置
cookie存放显示登录的用户信息.其实可以在前端设置一个cookie对象,包含isLogin,roles,username,不过我按查到的资料设置到,然后读取一直有问题,解
决了好久了,先按现在这种来吧.等找到错误原因了再继续完善吧.
当点击退出登录按钮时,清除掉当前页面的cookie,并跳转到登录页面.
清除cookie:Cookies.remove('isLogin');  Cookies.remove('roles');






                    



