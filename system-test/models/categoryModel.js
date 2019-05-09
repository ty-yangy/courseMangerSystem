//专门处理与课程分类相关的数据库操作
var pool=require('../libs/mysql');
var categorySqlMap=require('../libs/categorySqlMap');
var categoryModel={
    getAllCategory:function(callback){
        pool.query(categorySqlMap.getcategoryList,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    deleteCategory:function(arr,callback){
        pool.query(categorySqlMap.deleteCategoryByName,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    findByName:function(id,callback){
        pool.query(categorySqlMap.findOneByName,id,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    findByIdCategory:function(id,callback){
        pool.query(categorySqlMap.findOneById,id,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    saveEditCategory:function(arr,callback){
        pool.query(categorySqlMap.saveCategory,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    findByOrder:function(order,callback){
        pool.query(categorySqlMap.findOneByOrder,order,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    addCategory:function(arr,callback){
        pool.query(categorySqlMap.addCategoryInfo,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    }
}
module.exports=categoryModel;