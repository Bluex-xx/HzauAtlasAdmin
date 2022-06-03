let mysql = require('mysql')
let pool = mysql.createPool({
    host: '81.70.207.239', 
    port: 3306, 
    database: 'atlas', 
    user: 'atlas', 
    password: 'atlas123' 
})
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows)
            connection.release()
        })
    })
}
exports.query = query;

