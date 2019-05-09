var navSqlMap={
    getNavList:'SELECT * FROM `nav`;',
    deleteNav:'delete from nav where name =?',
    findByName:'select * from nav where name=?',
    findById:'select * from nav where id=?',
    //编辑导航信息并保存
    editNavInfo:'update nav set name=?,address=?,status=? where id=?',
    findByAddress:'select * from nav where address=?',
    saveNavInfo:'insert into nav (name,address,status)values(?,?,?)'
}
module.exports=navSqlMap;