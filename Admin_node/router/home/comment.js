const Router = require('koa-router');
const comment = new Router();
const db = require('../../utils/db')
const KoaBody = require('koa-body')
comment.use(KoaBody());
//获取所有评论
comment.post('/all',async (ctx)=>{
    let sql = `SELECT * FROM comment`
    let result = await new Promise((resolve)=>{
        db.query(sql,(err,data)=>{ 
            if(err) throw err;
            resolve(data)
        })
    })
    for(let i of result)
    {
       let userSearchSql = `SELECT * FROM user where uid = ${i.uid}`
       let userSearchResult = await new Promise((resolve)=>{
            db.query(userSearchSql,(err,data)=>{
                if(err) throw err;
                resolve(data)
            })
        } 
    )
        i.user = userSearchResult[0]
    }
    ctx.body = {
        data:result
    }
})
//删除某条评论
comment.post('/delete',async (ctx)=>{
    let id = ctx.request.body.id
    let sql = `DELETE FROM comment WHERE id = ${id}`
    let result = await new Promise((resolve)=>{
        db.query(sql,(err,data)=>{
            if(err) throw err;
            resolve(data)
        })
    })
    if(result.affectedRows == 1)
    {
        ctx.body = {
            msg:'comment delete success'
        }
    }
    else
    {
        ctx.body = {
            msg:'comment delete failed'
        }
    }
})
module.exports = comment;