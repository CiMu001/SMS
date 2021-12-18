const oracledb = require('oracledb')

const db_config = {
    user: 'CYP',
    password: '123456',
    connectString: '127.0.0.1:1521/orcl'
}

function connect(config) {
    return new Promise(function (resolve, reject) {
      try {
        oracledb.getConnection(config, function (err, conn) {
          if (err) {
            console.log("oracle数据库连接失败");
            resolve({
              status: -1,
              msg: '数据库连接失败',
              detail: err.message
            })  
            return
          }
          console.log("oracle数据库连接成功");
          resolve(conn);
        });
      } catch (ex) {
        console.log("oracle数据库连接出错");
        resolve({
          status: -1,
          msg: '数据库连接出错',
          detail: ex||'数据库连接时出现未知原因错误'
        })
      }
    });
}


function execute(conn, sql) {
    return new Promise(function (resolve, reject) {
      try {
        conn.execute(
          sql,[],
          function (err, result) {
            if (err) {
              console.log(err.message)
              resolve({
                status: -1,
                msg: '执行sql语句失败',
                detail: err.message
              })
              return
            }

            const res = result.rows.map((v)=>{ 
                return result.metaData.reduce((p, key, i)=> { 
                    p[key.name] = v[i]; return p; 
                }, {})
            });

            resolve(res)
          });
      } catch (ex){
        console.log('执行execute出错')
        resolve({
          status: -1,
          msg: "执行sql语句出错",
          detail: ex||'执行execute发生未知错误'
        })
      }
    })
}


function doRelease(conn) {
    conn.close(
      function (err) {
        if (err) {
          console.log(err.message)
          return
        }
        console.log('oracle数据库断开成功')
      });
}

async function db_query(sql){
    // 接收连接对象
    const conn = await connect(db_config)
    // 接收查询结果
    const data = await execute(conn, sql)
    // 关闭连接
    doRelease(conn)
    
    // console.log(data, 'data')
    return data
}


exports.query = db_query;