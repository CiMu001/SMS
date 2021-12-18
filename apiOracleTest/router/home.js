const Router = require('koa-router');
const home = new Router;

// 写对应的接口
home.get('/', async (ctx) => {
    ctx.body = { msg: '首页信息' };
});

home.get('/student', async (ctx) => {
    ctx.body = { msg: '学生信息' };
});

home.get('/att', async (ctx) => {
    ctx.body = { msg: '考勤信息' };
});

module.exports = home;