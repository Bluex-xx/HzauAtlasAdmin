const Router = require('koa-router');
const statistics = new Router();
const db = require('../../utils/db')
//获取用户数量，猫咪数量，花花数量，图片数量，评论数量
statistics.post('/all', async (ctx) => {
    let catSearchSql = `SELECT cid FROM cat`
    let flowerSearchSql = `SELECT fid FROM flower`
    let userSearchSql = `SELECT uid FROM user`
    let photoSearchSql = `SELECT pid FROM picture`
    let commentSearchSql = `SELECT id FROM comment`
    let cat_result = await new Promise((resolve) => {
        db.query(catSearchSql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    let flower_result = await new Promise((resolve) => {
        db.query(flowerSearchSql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    let user_result = await new Promise((resolve) => {
        db.query(userSearchSql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    let photo_result = await new Promise((resolve) => {
        db.query(photoSearchSql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    let comment_result = await new Promise((resolve) => {
        db.query(commentSearchSql, (err, data) => {
            if (err) throw err;
            resolve(data)
        })
    })
    ctx.body = {
        cat_num: cat_result.length,
        flower_num: flower_result.length,
        user_num: user_result.length,
        photo_num: photo_result.length,
        comment_num: comment_result.length
    }
})
module.exports = statistics;