const Koa = require('koa2');
const app = new Koa();
const port = 9000;
const router = require('./router/index')
const cors = require('koa2-cors');
app.use(cors());
app.use(router.routes(), router.allowedMethods());
app.use(async (ctx,next) => {
  await next();
  if(parseInt(ctx.status) === 404){
    ctx.body = '404';
  }
});
app.listen(port,()=>{console.log('Server is running at http://localhost:'+port)});