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
       return knex.select().from(table).whereNot("collection_status","cancelled");
   } else {
       return knex.select().from(table).where('id', idResultadoPagoOnline).andWhereNot("collection_status","cancelled");
   }
}

/**
 * Funcion que actualiza el registro 
 * del resultado de pagon online con informacion 
 * de mercado pago
 * @param {*} param0 
 */
const updateWithDataMercadoPago = ( id , update ) => {
  return knex(table).where('id', id).update(update); 
}

module.exports = {
    findRowNoProcesados,
    updateWithDataMercadoPago
}
