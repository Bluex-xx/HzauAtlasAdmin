const Router = require('koa-router');
const user = new Router();
const db = require('../../utils/db');
const KoaBody = require('koa-body');
user.use(KoaBody());
user.post('/',async (ctx)=>{
   let sql= 'SELECT * FROM user'
   let result = await new Promise((resolve) => {
    db.query(sql, (err, data) => {
        if (err) throw err;
        resolve(data)
    })
    })
    ctx.body = {
        data: result
    }   
});
module.exports = user;