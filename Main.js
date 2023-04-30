const express = require('express');
const exphbs = require('express-handlebars');
var DataHandler = require('./Model/DataHandler');
var app = express();
const { Op } = require("sequelize");

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

var userModel = DataHandler.User;
/*
hello = new Hello()
hello.setName('aaaa')
console.log(hello.name)
hello.sayHello()
*/

var userRouter = require('./Router/User');
var testRouter = require('./Router/Test')
var devRouter = require('./Router/Dev')
app.use('/user', userRouter);
app.use('/test',testRouter);
app.use('/dev',devRouter);

//  主页输出 "Hello World"
app.get('/', function (req, res) {
    console.log("主页 GET 请求");
    temp = userModel
    userModel.syncToModleAlter()
    res.send('Hello GET' + String(temp));
})

app.get('/create', async function (req, res) {
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
})

app.get('/getuser', async function (req, res) {
    var query = req.query
    if (!query.word) {
        res.status(404).end("word Error !")
        console.log("参数出错", query.word)
        return 1
    }
    console.log("开始查找", query.word)
    await userModel.findAll({      //使用await异步,否则会出错
        where: { username: { [Op.like]: "%"+query.word+"%" } },    //SQL的LIKE通配符,%表示无论前面/后面有什么字符都要匹配
        attributes: ['username', 'id'] //实际查询走username,但是为了让返回带上ID,所以这里需要加上ID
    }).then((results) => {
        res.end(JSON.stringify(results))
    }).catch((error) => {
        console.error(error);
        res.status(404).end("NO")
    });
    if (!query.word) {
        res.status(404).end("word Error !")
        console.log("参数出错", query.word)
        return 1
    }
})

/*
app.get('/user/:userId', async function (req, res) {
    var query = req.query
    const userId = req.params.userId;
    console.log("开始查找", query.word)
    await User.findAll({      //使用await异步,否则会出错
        where: { id: userId },    //SQL的LIKE通配符,%表示无论前面/后面有什么字符都要匹配
        attributes: ['firstname', 'id'] //实际查询走firstname,但是为了让返回带上ID,所以这里需要加上ID
    }).then((results) => {
            res.render('userinfo', JSON.stringify(results))
        }).catch((error) => {
            console.error(error);
            res.status(404).end("NO")
        });
})
*/
//  POST 请求
app.post('/', function (req, res) {
    console.log("主页 POST 请求");
    res.send('Hello POST');
})

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
    console.log("/del_user 响应 DELETE 请求");
    res.send('删除页面');
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function (req, res) {
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
})


var server = app.listen(8888, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})