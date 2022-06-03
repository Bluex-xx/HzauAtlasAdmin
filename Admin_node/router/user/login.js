const Router = require('koa-router');
const login = new Router();
const bodyParser = require('koa-bodyparser')
const db = require('../../utils/db')
const jwt = require('jsonwebtoken')
login.use(bodyParser());
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
          const token = jwt.sign({ account, password }, 'secret', { expiresIn: 3600 })
          const insertsql = `UPDATE users SET token = '${token}' where account = '${account}' and password = '${password}'`
          db.query(insertsql,(err,data) =>{
              if(err) throw err;
              if(data){
                  ctx.body={
                      data
                  }
              }
          })
          ctx.body = {
          token:token,
          msg:'success',
          account:account
       }
     }
     else
     {
        ctx.body = {
            msg:'密码错误',
            account:account
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