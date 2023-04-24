const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:./Data/data.sqlite");


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
    async SyncToModle() {      //同步User表,此操作为破坏性操作,可能会误删数据,请注意,最好使用sequelize CLI的迁移
        await User.sync({ force: true });
        console.log("用户模型表刚刚(重新)创建！");
        return 0
    }
    async Drop() {        //删除User表的数据,此操作为破坏性操作,可能会误删数据,请注意,最好使用sequelize CLI的迁移
        await User.drop()
        console.log("用户模型表已删除!")
        return 0
    }
}
// 定义User 使用init
User.init({
    firstname: Sequelize.TEXT,
    lastname: Sequelize.TEXT
}, { sequelize });

//// 开始定义模型-user,使用define
//const UserModle = sequelize.define("user", {
//    //名字,限制文本
//    name: DataTypes.TEXT,
//    favoriteColor: {    // 最爱的颜色,最低,默认为绿色
//        type: DataTypes.TEXT,
//        defaultValue: 'green'
//    },
//    //年龄,金额,限制整数
//    age: DataTypes.INTEGER,
//    cash: DataTypes.INTEGER
//});

//function DataHandler(){
//    this.User=class User{
//        constructor(){
//        }
//        get_user_list(){
//            fs.readdirSync("./Data/",function(err, files){
//                if (err) {
//                    return console.error(err);
//                }
//                console.log(files)
//                return files;
//            });
//        }
//    }
//}

module.exports = User