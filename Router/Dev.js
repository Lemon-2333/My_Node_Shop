var express = require('express');
var router = express.Router();
var devController = require("../Controller/Dev")
// 定义路由
router.get('/', devController.devList);

module.exports = router;