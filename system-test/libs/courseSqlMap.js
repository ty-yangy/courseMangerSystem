//准么处理课程管理模块的sql语句 
var courseSqlMap={
    getCourseInfo:'select * from course',
    deleteCourseByName:'delete from course where courseName=?',
    findIdByName:'select * from course where courseName=?',
    findIdById:'select * from course where id=?',
    getCategoryName:'select categoryName from classify',
    saveInfo:'update course set courseName=?,courseAddress=?,courseCategory=?,courseTime=?,courseStatus=? where (id=?)',
    addInfo:'insert into course (courseName,courseAddress,courseCategory,courseTime,courseStatus)values(?,?,?,?,?)',
    checkName:'select * from course where courseName=?',
    getInfoBySorting:'select * from course where courseCategory=?'

}
module.exports=courseSqlMap;