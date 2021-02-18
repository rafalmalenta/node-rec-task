const promisedSQLQuery = (conn,query,values)=>{
    return new Promise((resolve,reject)=>{
        const sql = query;
        const con = conn();
        con.query(sql,values, function (err, result) {
            if (err) reject("cant interact with database");
            else resolve(result);
        });
        con.end();
    })
}
module.exports = promisedSQLQuery
