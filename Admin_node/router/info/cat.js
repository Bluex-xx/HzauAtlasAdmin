const Router = require('koa-router');
const cat = new Router();
const db = require('../../utils/db');
const KoaBody = require('koa-body');
cat.use(KoaBody());
//获取所有的猫咪，及其图片
cat.post('/all', async (ctx) => {
    let sql = `SELECT * FROM cat`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    for (let i of result) {
        let photoSearchSql = `SELECT * FROM picture where cid = ${i.cid}`
        let userSearchResult = await new Promise((resolve) => {
            db.query(photoSearchSql, (err, data) => {
                if (err) throw err;
                resolve(data)
            })
        })
        i.photo = userSearchResult
    }
    ctx.body = {
        data: result
    }
})
//添加猫咪
cat.post('/add', async (ctx) => {
    let cat_info = ctx.request.body;
    let sql = `INSERT INTO cat (name,color,place,character1,cid) VALUES ('${cat_info.name}','${cat_info.color}','${cat_info.place}','${cat_info.character1}','${cat_info.cid}')`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    if(result.affectedRows == 1){
         ctx.body = {
            msg: 'cat insert success'
         }
    }
    else
    {
        ctx.body = {
            msg: 'cat insert fail'
         }
    }
})
//删除猫咪
cat.post('/delete', async (ctx) => {
    let cid = ctx.request.body.cid
    let sql = `DELETE FROM cat WHERE cid = ${cid}`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    if(result.affectedRows == 1)
    {
        ctx.body = {
            msg:'cat delete success'
        }
    }
    else
    {
        ctx.body = {
            msg:'cat delete failed'
        }
    }
})
//修改猫咪信息
cat.post('/update', async (ctx) => {
    let cat_update_info = ctx.request.body
    let sql = `UPDATE cat SET name = '${cat_update_info.name}', color = '${cat_update_info.color}', place = '${cat_update_info.place}', character1 = '${cat_update_info.character1}' where cid = '${cat_update_info.cid}'`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    if(result.affectedRows > 0){
        ctx.body = {
            data: 'cat update success'
        }
    }
    else
    {
        ctx.body = {
            data: 'cat update fail'
        }
    }

})
//删除猫咪某张照片
cat.post('/deletePhoto', async (ctx) => {
    let pid = ctx.request.body.pid
    let sql = `DELETE FROM picture WHERE pid = ${pid}`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    if(result.affectedRows == 1)
    {
        ctx.body = {
            msg:'delete cat photo success'
        }
    }
    else
    {
        ctx.body = {
            msg:'delete cat photo failed'
        }
    }
})
//添加猫咪图片，使用链接上传方式
cat.post('/addPhoto', async (ctx) => {
    let cat_photo_info = ctx.request.body
    let sql = `INSERT INTO picture (cid,store,name) VALUES ('${cat_photo_info.cid}','${cat_photo_info.store}','${cat_photo_info.name}')`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    if(result.affectedRows == 1){
            ctx.body = {
                msg: 'cat photo insert success'
            }
    }
    else
    {
        ctx.body = {
            msg: 'cat photo insert fail'
        }
    }
})
module.exports = cat;