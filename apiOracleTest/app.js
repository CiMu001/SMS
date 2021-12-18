// 入口文件
const Koa = require('koa2'); // 构造函数
const KoaBody = require('koa-body');

const app = new Koa(); // 声明一个实例
const router = require('./router');

app.use(KoaBody())
// 配置路由
app.use(router.routes(), router.allowedMethods());

const port = 5050; // 端口号

app.listen(port, ()=>{
    console.log(`Server is runing at http://localhost:${port}`)
});
