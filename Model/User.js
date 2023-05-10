const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:./Data/data.sqlite");

// 定义实例的自定义方法，既var ja=User.creat({firstname:ja})，中ja的实例
class User extends Model {
    static classLevelMethod() {
        return 'foo';
    }
    instanceLevelMethod() {
        return 'bar';
    }
    getFullname() {
        return [this.firstname, this.lastname].join(' ');
    }
}
// 定义更多自定义方法，以类为作用域，不用创建实例就能调用的方法
User.syncToModleForce = async function () {  //强制同步User表,此操作为破坏性操作,全部清除数据后再次重新创建,可能会误删数据,请注意,最好使用sequelize CLI的迁移
    await User.sync({ force: true });
    console.log("用户模型表刚刚(重新)创建！");
    return 0
}

User.syncToModleAlter = async function () {  //自动同步User表,此操作为破坏性操作,可能会误删数据,请注意,最好使用sequelize CLI的迁移
    await User.sync({ alter: true });
    console.log("用户模型表刚刚(重新)创建！");
    return 0
}

// 定义User 使用init
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,       //设置为主键
        autoIncrement: true     //自动增加
    },
    username: {                 //用户名
        type: DataTypes.STRING,
        defaultValue:"No Name"
    },
    password:{
        type:DataTypes.STRING,
        defaultValue:"12345"
    },
    age: {                      //用户年龄
        type: DataTypes.INTEGER,
        defaultValue:114514
    },
    email: {                    //用户电子邮件
        type: DataTypes.STRING,
        defaultValue:"114514@qq.com"
    },
    birthday: {                 //用户生日
        type: DataTypes.DATE,
        defaultValue:Date(1990,12,1)
    },
    avatr:{                     //头像
        type:DataTypes.TEXT,
        defaultValue:"user"
    }
}, { sequelize });

module.exports = User