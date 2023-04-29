var express = require('express');
var router = express.Router();
var userController = require("../Controller/User")
// 定义路由
router.get('/', userController.userList);

router.get('/:id', userController.userSpeace);

router.get('/search',userController.userSearch)
module.exports = router;