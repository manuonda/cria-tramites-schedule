
const MP = require("../config/library/mercadopago");
const logger = require('../config/library/logger')
/**
 * Controller de Operaciones con la API de MercadoPago
 */
class MercadoPagoController {
  constructor() {
    this.mercadoPago = MP;
  }

  /**
   * Funcion que permite realizar una consulta a la api de
   * Mercado Pago para obtener informacion de un payment determinado
   * @param {*} external_reference
   */
  async getPayment(external_reference = null) {
     logger.info('init method getPayment');
     var filters = {
      site_id: "MLA",
      external_reference: external_reference,
    };
    var response = null;
    try {
      var response = await this.mercadoPago.payment.search({
        qs: filters,
      });
      return Promise.resolve(response);
    } catch (error) {
         console.error(`Error : ${error}`);
         logger.error(`Error method getPayment ${error}`);
       return Promise.reject(error);
    }
  }
}

module.exports = MercadoPagoController;
