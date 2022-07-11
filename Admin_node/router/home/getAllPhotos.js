const Router = require('koa-router');
const photo = new Router();
const db = require('../../utils/db');
const KoaBody = require('koa-body');
photo.use(KoaBody());
photo.post('/',async (ctx)=>{
   let sql= 'SELECT * FROM picture'
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
module.exports = photo;