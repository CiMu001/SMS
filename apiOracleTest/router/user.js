const Router = require('koa-router')
const router = new Router()

const { login, test } = require('../controller/user')

// 登录接口
router.post('/login', login)
router.post('/test', test)

module.exports = router