/**
 * Configuracion de Mercado Pago
 */
require('dotenv').config()
var mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
});

module.exports = mercadopago;