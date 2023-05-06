const express = require('express');
const exphbs = require('express-handlebars');
var DataHandler = require('../Model/DataHandler');

var app = express();
const { Op } = require("sequelize");
const { error } = require('console');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

var userModel = DataHandler.User;

/**
 * @param {express.Request} req - 来自路由的请求.
 * @param {express.Response} res - 要发送至路由的响应.
 */
exports.userList = function (req, res) {

    res.send('用户列表');
}

/**
 * @param {express.Request} req - 来自路由的请求.
 * @param {express.Response} res - 要发送至路由的响应.
 */
exports.userSpeace = async function (req, res) {
    var userId = req.params.id;
    await userModel.findByPk(userId, {
        attributes: ['username', 'age', 'id', 'email']
    })
        .then((results) => {
            res.render('../Views/User/userinfo.hbs', results.toJSON())
        })
        .catch((error) => {
            console.error(error);
            res.status(404).end("NO")
        })
    //await userModel.findAll({      //使用await异步,否则会出错
    //    where: { id: userId },    //SQL的LIKE通配符,%表示无论前面/后面有什么字符都要匹配
    //    attributes: ['username', 'id'] //实际查询走username,但是为了让返回带上ID,所以这里需要加上ID
    //}).then((results) => {
    //        res.render('userinfo', JSON.stringify(results))
    //    }).catch((error) => {
    //        console.error(error);
    //        res.status(404).end("NO")
    //    });
}

/**
 * @param {express.Request} req - 来自路由的请求.
 * @param {express.Response} res - 要发送至路由的响应.
 */
exports.userSearch = async function (req, res) {
    var query = req.query
    if (!query.word) {  //检测参数,参数名为word,既关键词
        res.status(404).end("word Error !")
        console.log("参数出错", query.word)
        return 1
    }
    console.log("开始查找", query.word)
    await userModel.findAll({      //使用await异步,否则会出错
        where: { username: { [Op.like]: "%c%" } },    //SQL的LIKE通配符,%表示无论前面/后面有什么字符都要匹配
        attributes: ['username', 'id'] //实际查询走username,但是为了让返回带上ID,所以这里需要加上ID
    })
        .then((results) => {
            res.end(JSON.stringify(results))
        })
        .catch((error) => {
            console.error(error);
            res.status(404).end("NO")
        });
}
