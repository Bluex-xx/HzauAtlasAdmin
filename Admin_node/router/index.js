const Router = require('koa-router');
const router = new Router();
const login = require('./user/login.js');
const comment = require('./home/comment.js');
const statistics = require('./home/statistics.js');
const cat = require('./info/cat.js');
const flower = require('./info/flower.js');
const upload = require('./upload/upload.js');
const photo = require('./home/getAllPhotos.js')
const user = require('./user/getAllUsers.js')
router.use('/login', login.routes(), login.allowedMethods());
router.use('/comment', comment.routes(), comment.allowedMethods());
router.use('/statistics', statistics.routes(), statistics.allowedMethods());
router.use('/cat', cat.routes(), cat.allowedMethods());
router.use('/flower', flower.routes(), flower.allowedMethods());
router.use('/upload', upload.routes(), upload.allowedMethods());
router.use('/photo',photo.routes(),photo.allowedMethods());
router.use('/user',user.routes(),user.allowedMethods());
module.exports = router;