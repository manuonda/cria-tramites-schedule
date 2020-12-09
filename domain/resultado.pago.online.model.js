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

module.exports = {
    findRowNoProcesados
}
