var setSystemSqlMap={
    getSystemInfo:'select * from system',
    saveSystemInfo:'update system set sitetitle=?,sitesubtitle=?,websitedescription=?,websitelogo=?,adminemail=?,codeaddress=?,websitecopyright=?,websiterecode=? where (id=0)'
}
module.exports=setSystemSqlMap;