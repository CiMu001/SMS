const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建模型
const User = seq.define('User', {
    user_id: {
        type: DataTypes.INTEGER(12),
        allowNull: false,
        unique: true,
        comment: '用户iD号',
        primaryKey: true,
    },
    user_name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.CHAR(24),
        allowNull: false,
        comment: '密码',
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '性别',
    },
    tel: {
        type: DataTypes.INTEGER(13),
        allowNull: true,
        comment: '电话',
    },
    word_id: {
        type: DataTypes.STRING,
        comment: '工作公寓号',
    },
    type: {
        type: DataTypes.STRING,
        comment: '员工职位',
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
        comment: '是否为管理员 0不 1是',
    }
})

// 强制同步数据表
User.sync({ force: true })

module.exports = User