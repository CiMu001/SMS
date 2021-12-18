const db = require('../db/seq')

class UserService {
    async loginUser(userid, password) {
        // todo  操作数据库
        const body = {
            code: 0,
            msg: 'null',
            data: {},
        }
        const result = await db.query(`SELECT * FROM \"user\" WHERE \"user_id\" = ${userid}`)
        console.log(result, 'result')
        if (result.length == 0) {
            body['code'] = 500;
            body['msg'] = "账号不存在!";
            return body;
        }
    
        if (result[0].password == password)
        {
            body['code'] = 200;
            body['msg'] = "登录成功!";
            body['data'] = result[0];
            return body;
        }
        else {
            body['code'] = 500;
            body['msg'] = "账号或密码不正确!!";
            return body;
        }
    }

    async test(){
        const result = await db.query("SELECT * FROM \"user\"")
        return result
    }
}

module.exports = new UserService()