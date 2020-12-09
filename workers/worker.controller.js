
const { response } = require('express');
const MP = require('../config/library/mercadopago');
const {lastRow, add } = require('../domain/registros.worker.model')
const { findRowNoProcesados } = require('../domain/resultado.pago.online.model');


class WorkerController{
    
    constructor(){
      
    }
    
    /**
     * Funcion que permite ejecutar 
     * un sincro
     */
      async ejecutar(){
        console.log("ejecutar");
        try {
          console.log("ejecutar");
          const row = await lastRow();
          if ( Array.isArray(row) && row.length > 0 ) {
               console.log("aqui ingreso ");
          }  else {
              // no existe worker ejecutado
             const rows = await findRowNoProcesados(); 
             if ( rows && rows.length > 0 ) {
                 // Verificar los 3 campos si tiene monto total neto , la fecha de pago 
                 // y si esta approved 
                 
             }
          }
           
        } catch (error) {
            console.error(error);
        }
    }


}


module.exports =  WorkerController