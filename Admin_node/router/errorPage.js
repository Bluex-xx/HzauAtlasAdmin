const Router = require('koa-router');
const errorPage = new Router();
errorPage.post('/', async (ctx) => {
    ctx.body = "接口不存在";
})
module.exports = errorPage;
