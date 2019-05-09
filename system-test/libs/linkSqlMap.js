var linkSqlMap={
    getLinkList:'select * from link',
    deleteLinkByName:'delete from link where linkName=?',
    getOneLinkByName:'select * from link where linkName=?',
    getOneLinkById:'select * from link where id=?',
    saveLinkById:'update link set linkName=?,linkAddress=?,linkOrder=?,linkDescription=? where (id=?)',
    getOneLinkByAddress:'select * from link where linkAddress=?',
    addLink:'insert into link (linkName,linkAddress,linkOrder,linkDescription)values(?,?,?,?)'
}
module.exports=linkSqlMap;