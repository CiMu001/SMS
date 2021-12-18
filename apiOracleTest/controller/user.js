const { loginUser, test } = require('../service/user')

class UserController {
    async login(ctx, next) {
        // 1 获取数据
        console.log(JSON.parse(ctx.request.body));
        // 2 操作数据库
        const { userid, password } = JSON.parse(ctx.request.body);
        const res = await loginUser(userid, password);
        console.log(res, 'res')
        // 3 返回结构
        ctx.body = res;
    }

    async test(ctx) {
        const res = await test();
        console.log(res)
        ctx.body = res;
    }
}

module.exports = new UserController()