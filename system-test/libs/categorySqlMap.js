var categorySqlMap={
    getcategoryList:'SELECT * FROM `classify`;',
    deleteCategoryByName:'delete from classify where categoryName =?',
    findOneByName:'select * from classify where categoryName=?',
    findOneById:'select * from classify where id=?',
    saveCategory:'update classify set categoryName=?,categoryOrder=?,categoryIcon=?,categoryDescription=?,categoryStatus=? where (id=?)',
    findOneByOrder:'select * from classify where categoryOrder=?',
    addCategoryInfo:'INSERT INTO `classify` (`categoryName`, `categoryOrder`, `categoryIcon`, `categoryDescription`, `categoryStatus`) VALUES (?, ?, ?, ?, ?)'
}
module.exports=categorySqlMap;