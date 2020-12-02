/**
 * Class Controller Correspondiente 
 * a Tramite
 */
const MP = require('../../config/library/mercadopago')
const db = require('../../config/database/db')
const tramiteModel = require('../../domain/tramite.model')

class TramiteController{
    
    constructor(db){
      this._MP = MP
      this._db = db
    }


    findById(req,res ){
      try {
        const result = tramiteModel.findById(req.params.id);   
      } catch(error) {
        res.status(500);
      } 
      
    }

    /**
     * Funcion que permite devolver todos los tramites
     * @param {*} req 
     * @param {*} res 
     */
    findAll(req, res){
     console.log(MP)
     console.log(db)

    }
}

module.exports = TramiteController;