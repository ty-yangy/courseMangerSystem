//处理相关数据库连接的,利用pool来进行连接
//引入mysql中的引擎mysql
var mysql=require('mysql');
//使用配置文件
var config=require('config-lite')(__dirname);
//连接数据库
var pool=mysql.createPool(config.mysql);
module.exports=pool;