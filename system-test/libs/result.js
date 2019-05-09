//专门用来存放返回结果
var result={
    createResult:function(success,data){
        return{
            success:success,
            data:data
        }
    }
}
module.exports=result;