const {Router} = require('express')
const { MercadoPagoController } = require('../controllers/mercadopago.controller');
const mercadoPagoController =  new MercadoPagoController();

const router = Router();

router.get('/payment', mercadoPagoController.getPayment());

module.exports = router;