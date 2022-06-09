// 
//图片上传接口
//
const Router = require('koa-router');  
const upload = new Router();  //   /uploads请求接口地址
const KoaBody = require('koa-body');
const path = require('path');
let filename;
upload.use(KoaBody({    
    multipart: true,   
    formidable: {     
      uploadDir: path.join(__dirname, '../../public/uploads'), 
      keepExtensions: true ,  
      onFileBegin:(name,file) => { // 文件上传前的设置
        filename = file.newFilename;
      },
    }    
  }
  ));
upload.post('/', ctx => {
  ctx.body = { url: `${ctx.origin}/uploads/${filename}` };
  
})
module.exports = upload;
