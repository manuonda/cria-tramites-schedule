const CONFIG_DATABASE = require('../environments/index')
const knex = require('knex')(CONFIG_DATABASE);
module.exports = knex;