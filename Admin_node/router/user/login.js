const Router = require('koa-router');
const login = new Router();
const KoaBody = require('koa-body')
const db = require('../../utils/db')
const jwt = require('jsonwebtoken')
const secret = '113Bsadsaddsdvcvongxcvmas'
login.use(KoaBody());
//登录接口，获取token
login.post('/', async (ctx) => {
   let account = ctx.request.body.account;
   let password = ctx.request.body.password;
   let sql = `SELECT * FROM users where account = '${account}'`;
   let result = await new Promise((resolve) => {
		return db.query(sql, (err, data) => {
         if (err) throw err;
			if (data.length > 0) {
				resolve(data);
			} else {
				resolve(false);
			}
		})
	})
  if (result) {
     if(result[0].password == password)
     {
          let payload = {password:password.userNumber,time:new Date().getTime(),timeout:1000*60*60*2}
          let token = jwt.sign(payload, secret);
        //   let token = jwt.sign({ account, password }, 'secret', { expiresIn: 3600 })
        //   let insertsql = `UPDATE users SET token = '${token}' where account = '${account}' and password = '${password}'`
        //   db.query(insertsql,(err,data) =>{
        //       if(err) throw err;
        //       if(data){
        //           ctx.body={
        //               data
        //           }
        //       }
        //   })
          ctx.body = {
          token:token,
          msg:'success',
          status:200
       }
     }
     else
     {
        ctx.body = {
            msg:'密码错误',
            status:500
        }
     }
    }
  else
  {
      ctx.body={
          msg:'账号错误'
      }
  }

});
module.exports = login;