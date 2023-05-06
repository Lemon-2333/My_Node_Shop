var express = require('express');
var router = express.Router();
var devController = require("../Controller/Dev")
// 定义路由
router.get('/', devController.devList);
router.get('/userModelSyncToModleAlter',devController.userModelSyncToModleAlter)
router.get('/userModelSyncToModleForce',devController.userModelSyncToModleForce)
router.get('/userModelSearchName',devController.userModelSearchName)
router.get('/userModelCreatData',devController.userModelCreatData)
module.exports = router;