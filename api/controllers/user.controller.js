
const { pool } = require("../../config/database/db");

/**
 * Funcion que permite obtener el UserController
 */
class UserController {
   
   constructor(){}
    sayHello(req,res) {
       return res.send({message: "Hola Mundo"})
   }
}

module.exports = UserController