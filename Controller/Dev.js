const express = require('express');
const exphbs = require('express-handlebars');

var DataHandler = require('../Model/DataHandler');
var userModel = DataHandler.User;

var app = express();
const { Op } = require("sequelize");
const { error } = require('console');


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

/**
 * @param {express.Request} req - 来自路由的请求.
 * @param {express.Response} res - 要发送至路由的响应.
 */
exports.devList = function (req, res) {
    res.sendFile(process.cwd()+'/Public/html/devList.html')
}
/**
 * @param {express.Request} req - 来自路由的请求.
 * @param {express.Response} res - 要发送至路由的响应.
 */
exports.userModelSyncToModleAlter=function(req,res){
    userModel.syncToModleAlter()
    res.end("已经自动重新创建用户表")
}
/**
 * @param {express.Request} req - 来自路由的请求.
 * @param {express.Response} res - 要发送至路由的响应.
 */
exports.userModelSyncToModleForce=function(req,res){
    userModel.syncToModleForce()
    res.end("已经强制重新创建用户表")
}
/**
 * @param {express.Request} req - 来自路由的请求.
 * @param {express.Response} res - 要发送至路由的响应.
 */
exports.userModelSearchName=async function(req,res){
    var query = req.query
    if (!query.word) {  //检测参数,参数名为word,既关键词
        res.status(404).end("word Error !")
        console.log("参数出错", query.word)
        return 1
    }
    console.log("开始查找", query.word)
    await userModel.findAll({      //使用await异步,否则会出错
        where: { username: { [Op.like]: "%"+query.word+"%" } },    //SQL的LIKE通配符,%表示无论前面/后面有什么字符都要匹配
        attributes: ['username', 'id'] //实际查询走username,但是为了让返回带上ID,所以这里需要加上ID
    })
        .then((results) => {
            res.end(JSON.stringify(results))
        })
        .catch((error) => {
            console.error(error);
            res.status(404).end(error)
        });
    if (!query.word) {
        res.status(404).end("word Error !")
        console.log("参数出错", query.word)
        return 1
    }
}
/**
 * @param {express.Request} req - 来自路由的请求.
 * @param {express.Response} res - 要发送至路由的响应.
 */
exports.userModelCreatData=async function(req,res){
    console.log("创建数据")
    var query = req.query
    console.log(query)

    if (1) {
        var user = await userModel.create({username:query.username, age:query.age  })
    }
    else {
        res.status(404).end("Error!")
        return 1
    }
    res.send(query.username+user.toJSON())
    console.log(user.toJSON())
    res.end()
}