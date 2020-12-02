const CONFIG_DATABASE = require('../environments/index')
console.log(CONFIG_DATABASE)
const knex = require('knex')(CONFIG_DATABASE);
module.exports = knex;