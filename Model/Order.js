const { Model, DataTypes } = require('sequelize');

class Order extends Model { }

Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {  //创建用户ID
        type: DataTypes.INTEGER
    },
    status: {   //订单状态
        type: DataTypes.STRING,
        defaultValue:"未完成"
    },
    commodity_id:{
        type:DataTypes.STRING
    },
    total_amount: {     //总金额
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE
    }
});

Order.syncToModleForce = async function () {  //强制同步User表,此操作为破坏性操作,全部清除数据后再次重新创建,可能会误删数据,请注意,最好使用sequelize CLI的迁移
    await Order.sync({ force: true });
    console.log("订单模型表刚刚(重新)创建！");
    return 0
}

Order.syncToModleAlter = async function () {  //自动同步User表,此操作为破坏性操作,可能会误删数据,请注意,最好使用sequelize CLI的迁移
    await Order.sync({ alter: true });
    console.log("订单模型表刚刚(重新)创建！");
    return 0
}