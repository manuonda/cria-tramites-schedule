const {Router}  = require('express')
const { UserController } = require('../controllers/index')
const controller = new UserController();

const router = Router();
router.get("/hello", controller.sayHello);

module.exports =  router;
