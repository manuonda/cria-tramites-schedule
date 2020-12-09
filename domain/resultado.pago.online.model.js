const knex =   require('../config/database/db');
const { SCHEMA } = process.env;
const table = SCHEMA + '.resultado_pago_online';
/**
 * Funcion que permite obtener los registros 
 * a partir de que contenga valor el id a partir 
 * del cual obtener los datos
 * @param {} idResultadoPagoOnline
 */
const findRowNoProcesados = ( idResultadoPagoOnline = "")  => {
   if ( idResultadoPagoOnline === "") {
       return knex.select().from(table);
   } else {
       return knex.select()-from(table).where('id', idResultadoPagoOnline);
   }
}

/**
 * Funcion que actualiza el registro 
 * del resultado de pagon online con informacion 
 * de mercado pago
 * @param {*} param0 
 */
const updateWithDataMercadoPago = ( id , idExternalReference, statusCollection, fechaPago, montoTransaction, montoRecibido ) => {
  var update = {
      collection_status: statusCollection,
      fecha_pago: fechaPago,
      monto_transaction: montoTransaction,
      monto_recibido : montoRecibido
  };
  console.log(update);
  return knex(table).where('id_tramite', idExternalReference).update(update); 
}

module.exports = {
    findRowNoProcesados,
    updateWithDataMercadoPago
}
