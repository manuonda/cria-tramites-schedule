require('dotenv').config()

const knex =   require('../config/database/db');
const { SCHEMA } = process.env;
const table = SCHEMA + '.registros_workers';

/**
 * Funcion que permite guardar 
 * un registro en la tabla registro_workers
 * @param {*} param0 
 */
const add = ({ }) => {

}

/**
 * Funcion que permite obtener el ultimo 
 * registro de worker ejecutado
 */
const lastRow = () => {
    console.log(knex.select().from(table).orderBy('id','desc').limit(1).offset(1).toSQL());
    return knex.select().from(table).orderBy('id','desc').limit(1).offset(1);
}



module.exports = {
    add : add,
    lastRow: lastRow
}