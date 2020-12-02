require('dotenv').config()
const { connection } = require('../config/environments')

const knex = require('../config/database/db')
const db =  require('../config/database/db')
const table =  connection.database +'.tramites';

const findById = (id) => {
try {
      console.log(db);
      db.select().from(table)
  } catch (error) {
      return error;
  }
}

const findAll =  () => {
    try {
        knex.select()
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    findById : findById

}