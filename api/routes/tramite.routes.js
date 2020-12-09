const {Router} = require('express')
const {TramiteController } = require('../controllers');
const   router = Router()
const controller =  new TramiteController()


router.get('/all', controller.findAll);
router.get('/find/:id', controller.findById);


module.exports = router;