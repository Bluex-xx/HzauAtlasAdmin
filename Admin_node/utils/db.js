let mysql = require('mysql')
let pool = mysql.createPool({
    host: '127.0.0.1', //数据库地址
    port: 3306, //端口号
    database: 'demo', //数据库名称
    user: 'demo', //数据库用户名
    password: 'demo' //数据库密码
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
