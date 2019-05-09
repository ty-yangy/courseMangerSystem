var userSqlMap={
    //?表示要查询的邮箱
    getByEmail:'select * from user where email=?',
    //保存邮箱
    saveInfo:'insert into user (email,username,password,status,role,create_time)values(?,?,?,?,?,?)',
    //var sql='SELECT *FROM admin WHERE username="'+user_data.username+'" AND password="'+user_data.password+'"';
    getByUserAndPas:'select * from user where username=? and password=?',
    //获取到所有用户信息
    getUserList:'SELECT * FROM `user`;',
    deleteByEmail:'delete from user where email =?',
    getById: 'select * from user where id=?',
    getAllEmailNotNow:'select * from `user` where id not in (?)',
    //编辑用户信息
    editUserInfo:'update user set username=?,email=?,role=?,status=? where id=?',
    editUserPassword:'update user set password=? where username=?'
};
module.exports=userSqlMap;