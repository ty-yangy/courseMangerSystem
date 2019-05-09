//专门处理与友情链接相关的数据库操作
var pool=require('../libs/mysql');
var linkSqlMap=require('../libs/linkSqlMap');
var linkModel={
    getAllLink:function(callback){
        pool.query(linkSqlMap.getLinkList,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    deleteLink:function(name,callback){
        pool.query(linkSqlMap.deleteLinkByName,name,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    getOneByName:function(name,callback){
        pool.query(linkSqlMap.getOneLinkByName,name,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    showEditLinkInfo:function(id,callback){
        pool.query(linkSqlMap.getOneLinkById,id,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    saveEditLink:function(arr,callback){
        pool.query(linkSqlMap.saveLinkById,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    getOneByAddrsee:function(address,callback){
        pool.query(linkSqlMap.getOneLinkByAddress,address,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    addLinkInfo:function(arr,callback){
        pool.query(linkSqlMap.addLink,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    }
}
module.exports=linkModel;
