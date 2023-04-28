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
        type: DataTypes.STRING
    },
    total_amount: {     //总金额
        type: DataTypes.DECIMAL(10, 2)
    },
    created_at: {
        type: DataTypes.DATE
    }
});
