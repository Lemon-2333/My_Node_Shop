const express = require('express');
const exphbs = require('express-handlebars');
var DataHandler = require('../Model/DataHandler');

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
