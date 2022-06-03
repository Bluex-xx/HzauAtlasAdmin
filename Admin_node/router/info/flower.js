const Router = require('koa-router');
const flower = new Router();
const db = require('../../utils/db');
const bodyParser = require('koa-bodyparser');
flower.use(bodyParser());
//获取所有的花花，及其图片
flower.post('/all', async (ctx) => {
    let sql = `SELECT * FROM flower`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    for (let i of result) {
        let photoSearchSql = `SELECT * FROM picture where fid = ${i.fid}`
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
//添加花花
flower.post('/add', async (ctx) => {
    let flower_info = ctx.request.body;
    let sql = `INSERT INTO flower (name,florescence,department,allegory,color) VALUES ('${flower_info.name}','${flower_info.florescence}','${flower_info.department}','${flower_info.allegory}','${flower_info.color}')`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    if(result.affectedRows == 1){
         ctx.body = {
            data: 'flower insert success'
         }
    }
    else
    {
        ctx.body = {
            data: 'flower insert fail'
         }
    }
})
//删除花花
flower.post('/delete', async (ctx) => {
    let flower_info = ctx.request.body;
    let sql = `DELETE FROM flower WHERE fid = ${flower_info.fid}`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    if(result.affectedRows == 1){
         ctx.body = {
            data: 'flower delete success'
         }
    }
    else
    {
        ctx.body = {
            data: 'flower delete fail'
         }
    }
})
//更新花花信息
flower.post('/update', async (ctx) => {
    let flower_info = ctx.request.body;
    let sql = `UPDATE flower SET name = '${flower_info.name}',florescence = '${flower_info.florescence}',department = '${flower_info.department}',allegory = '${flower_info.allegory}',color = '${flower_info.color}' WHERE fid = ${flower_info.fid}`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    if(result.affectedRows == 1){
            ctx.body = {
                data: 'flower update success'
            }
        }
        else
        {
            ctx.body = {
                data: 'flower update fail'
            }
        }
})
//删除花花图片
flower.post('/deletePhoto', async (ctx) => {
    let flower_info = ctx.request.body;
    let sql = `DELETE FROM picture WHERE pid = ${flower_info.pid}`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    if(result.affectedRows == 1){
            ctx.body = {
                data: 'flower photo delete success'
            }
        }
        else
        {
            ctx.body = {
                data: 'flower photo delete fail'
            }
        }
})
//添加花花图片,使用链接上传
flower.post('/addPhoto', async (ctx) => {
    let flower_info = ctx.request.body;
    let sql = `INSERT INTO picture (fid,store) VALUES (${flower_info.fid},'${flower_info.store}')`
    let result = await new Promise((resolve) => {
        db.query(sql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    }
    )
    if(result.affectedRows == 1){
            ctx.body = {
                data: 'flower photo insert success'
            }
        }
        else
        {
            ctx.body = {
                data: 'flower photo insert fail'
            }
        }
})
module.exports = flower;

