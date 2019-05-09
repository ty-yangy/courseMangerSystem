//专门处理与导航相关的数据库操作
var pool=require('../libs/mysql');
var navSqlMap=require('../libs/navSqlMap');
var navModel={
    getAllNav:function(callback){
        pool.query(navSqlMap.getNavList,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    deleteOneNav:function(arr,callback){
        pool.query(navSqlMap.deleteNav,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    findOne:function(arr,callback){
        pool.query(navSqlMap.findByName,arr,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    findIdNav:function(arr,callback){
        pool.query(navSqlMap.findById,arr,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    editNav:function(arr,callback){
        pool.query(navSqlMap.editNavInfo,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    getByAddress:function(arr,callback){
        pool.query(navSqlMap.findByAddress,arr,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    saveNavInfo:function(arr,callback){
        pool.query(navSqlMap.saveNavInfo,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    }
}
module.exports=navModel;