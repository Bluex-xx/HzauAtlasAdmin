const Koa = require('koa2');
const app = new Koa();
const port = 9000;
const router = require('./router/index')
const cors = require('koa2-cors');
const check = require('./utils/check');
const errorHandler = require('./utils/errorHandler.js');
app.use(cors());
app.use(async (ctx,next) => {
  await next();
  if(parseInt(ctx.status) === 404){
    ctx.body = '404';
  }
});
app.use(check);
app.use(router.routes(), router.allowedMethods());
errorHandler(app);
app.listen(port,()=>{console.log('HzauAtlasAdmin Server is running at http://localhost:'+port)});