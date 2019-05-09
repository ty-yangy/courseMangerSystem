//处理和系统设置相关的数据模块
var pool=require('../libs/mysql');
var setSystemSqlMap=require('../libs/setSystemSqlMap');
var setSystemModel={
    getSetSystemInfo:function(callback){
        pool.query(setSystemSqlMap.getSystemInfo,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    saveEditSetInfo:function(arr,callback){
        pool.query(setSystemSqlMap.saveSystemInfo,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    }
}
module.exports=setSystemModel;