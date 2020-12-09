require('dotenv').config()
const { connection } = require('../config/environments')
const { SCHEMA } = process.env

const Knex = require('../config/database/db');
const table =  SCHEMA +'.tramites';
console.log(table);

/**
 * Find by id
 * @param {*} id 
 */
const findById = (id) => {
     return Knex.select()
            .from(table)
            .where('id_tramite',id);
}


/**
 * Find All
 */
const findAll =  ()  => {
    return Knex.select().from(table);
}


/**
 * Exports modules
 */
module.exports = {
    findById : findById,
    findAll: findAll
}