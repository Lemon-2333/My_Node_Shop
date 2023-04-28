var express = require('express');
var router = express.Router();
// 定义路由
router.get('/', function(req,res){
    res.end("测试页面")
});

module.exports = router;