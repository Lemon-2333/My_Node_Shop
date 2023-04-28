const { Model, DataTypes } = require('sequelize');

class Merchant extends Model { }

Merchant.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    salesvolume: {  //销售量
        type: DataTypes.INTEGER, allowNull: false
    },
    salesAmount: {  //销售额
        type: DataTypes.FLOAT, allowNull: false
    },
    avatar:{     //商家头像
        type:DataTypes.TEXT,
        defaultValue:"Merchant"
    },
    banner:{    //商家头图
        type:DataTypes.TEXT,
        defaultValue:"banner"
    }
});
