// 引入路由
const Router = require('koa-router');
const router = new Router;
const home = require('./home');
const user = require('./user')

router.use('/home', home.routes(), home.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());

// 重定向
router.redirect('/', '/home')

module.exports = router;