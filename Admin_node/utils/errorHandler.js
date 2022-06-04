// 统一异常处理
module.exports = (app) => {
    app.use(async (ctx, next) => {
        let status = 0;
        let fileName = "";
        try{
            await next();
            status = ctx.status;
        }catch(err){
            //console.log(err);
            status = 500;
        }
        if(status >= 400){
            switch(status){
                case 400:
                case 404:
                case 500:
                    fileName = status;
                    break;
                default:
                    fileName = "other";
                    break;
            }
        }
        ctx.response.status = status;
        console.log(fileName);
    });
}
