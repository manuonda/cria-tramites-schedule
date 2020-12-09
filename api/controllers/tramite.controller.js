/**
 * Class Controller Correspondiente 
 * a Tramite
 */
const { response } = require('express');
const MP = require('../../config/library/mercadopago')
const tramiteModel = require('../../domain/tramite.model')

class TramiteController{
    
    constructor(){
      this._MP = MP
    }


    findById(req,res ){
      try {
        const result = tramiteModel.findById(req.params.id);   
      } catch(error) {
        console.error(`Error : ${error}`);
        res.status(500);
      } 
      
    }

    /**
     * Funcion que permite devolver todos los tramites
     * @param {*} req 
     * @param {*} res 
     */
    async findAll(req, res){
      try {
        const rows =  await tramiteModel.findAll();
        res.status(200).send(rows);
      } catch (error) {
         console.error(`Error : ${error}`);
         res.status(500).send({ message: error});
      }
    }
}

module.exports = TramiteController;