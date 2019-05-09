//专门处理与用户相关的数据库操作
//1.连接数据库,mysql.js是专门处理链接数据库的,这个库中导出了一个pool对象,
//利用pool变量连接数据库.则须先引入pool这个变量
var pool=require('../libs/mysql');
//2.使用数据库查询
//查询前需要先写入sql的查询语句,我们建一个专门存放数据库操作语句的对象,存放数据
//库相关的语句.然后再将其引入userSqlMap中存放与user相关的sql语句.
var userSqlMap=require('../libs/userSqlMap');
//创建一个专门用于user模块的出具处理的对象
var userModel={
    //创建findOne方法查询数据库,并返回一个回调函数(用来处理查询结束后执行的函数)
    findOne:function(email,callback){
        //操作数据库需要用到pool对象.
        //此处用?代替第二个参数中的email,
        //sql语句会自动将前两个参数进行拼接,以免出现拼接式的错误将sql语句抽离到userSqlMap.js中.
        pool.query(userSqlMap.getByEmail,[email],function(err,result){
            if(err) throw err;
            //result:存放数据库中查询到的数据,是一个数组对象
            //以防传入的callback是一个空对象.
            //将查找到的数组中的第一个结果传入回调函数
            callback && callback(result[0]);
        })
    },
    //创建saveOne方法将数据保存到数据库中,并返回一个回调函数.
    //arr是一个数组对象
    saveData:function(arr,callback){
        pool.query(userSqlMap.saveInfo,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    findUseInfo:function(arr,callback){
        pool.query(userSqlMap.getByUserAndPas,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    getAllUser:function(callback){
        pool.query(userSqlMap.getUserList,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    deleteOneUser:function(email,callback){
        pool.query(userSqlMap.deleteByEmail,email,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    findById:function(id,callback){
        pool.query(userSqlMap.getById,id,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    findAllByEmail:function(id,callback){
        pool.query(userSqlMap.getAllEmailNotNow,id,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    updateUserInfo:function(arr,callback){
        pool.query(userSqlMap.editUserInfo,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    editUserPass:function(arr,callback){
        pool.query(userSqlMap.editUserPassword,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    }
};
module.exports=userModel;
