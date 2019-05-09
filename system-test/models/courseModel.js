//处理和课程管理相关的数据模块
var pool=require('../libs/mysql');
var courseSqlMap=require('../libs/courseSqlMap');
var courseModel={
    getCourseList:function(callback){
        pool.query(courseSqlMap.getCourseInfo,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    deleteCourse:function(name,callback){
        pool.query(courseSqlMap.deleteCourseByName,name,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    returnIdByName:function(name,callback){
        pool.query(courseSqlMap.findIdByName,name,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    findByIdCourse:function(id,callback){
        pool.query(courseSqlMap.findIdById,id,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    getAllCategoryName:function(callback){
        pool.query(courseSqlMap.getCategoryName,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    saveEditInfo:function(arr,callback){
        pool.query(courseSqlMap.saveInfo,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    saveCourseInfo:function(arr,callback){
        pool.query(courseSqlMap.addInfo,arr,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    },
    checkNameExist:function(name,callback){
        pool.query(courseSqlMap.checkName,name,function(err,result){
            if(err) throw err;
            callback && callback(result[0]);
        })
    },
    getSorting:function(sorting,callback){
        pool.query(courseSqlMap.getInfoBySorting,sorting,function(err,result){
            if(err) throw err;
            callback && callback(result);
        })
    }
}
module.exports=courseModel;