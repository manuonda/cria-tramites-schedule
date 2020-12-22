const logger = require("../config/library/logger");
const  { format } = require("date-fns");

// domain
const {
  lastWorkerRow,
  addWorker,
} = require("../domain/registros.worker.model");
const {
  findRowNoProcesados,
} = require("../domain/resultado.pago.online.model");
const {
  updateWithDataMercadoPago,
} = require("../domain/resultado.pago.online.model");

//controller
const MercadPagoCtrl = require("../workers/mercadopago.controller");

/**
 * Class que permite correr un worker a partir de un determinado
 * horario establecido por el job de cron/tab de linux.
 * Funcion que realizar la operacion principal
 */
class WorkerController {
  mercadoPagoCtrl;
  constructor() {
    this.mercadoPagoCtrl = new MercadPagoCtrl();
  }

  /**
   * Funcion que permite ejecutar
   * un sincro
   */
  async execute() {
    try {
        // no existe worker ejecutado
      const rows = await findRowNoProcesados();
        if (rows && rows.length > 0) {
           this.procesarPagos(rows);
        }

    } catch (error) {
      console.error(error);
      logger.error(`Error : ${error}`);
    }
  }

  /**
   * Funcion que procesa los pagos realizados
   * @param {*} rows
   */
  async procesarPagos(rows) {
    try {
      let idFirstResultadoPagoOnline = null;
      let idLastResultadoPagoOnline = null;
      let start_time_worker = null;
      let end_time_worker = null;
      let fecha_ejecucion = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      start_time_worker = format(new Date(), "HH:mm:ss");
      let cantidad = 0;
      for (let i in rows) {
        
        let id = rows[i].id;
        let external_reference = rows[i].external_reference;
        let estado = rows[i].collection_status;
        let fechaPago = rows[i].fecha_pago;
        let montoTransaction = rows[i].monto_transaction;
        let montoRecibido = rows[i].monto_recibido;
        logger.info(
          `Estado ${estado} , fechaPago : ${fechaPago} , montoTransaction :${montoTransaction} , montoRecibido :${montoRecibido}`
        );

        if (( estado !== "approved" && estado !== "cancelled") ||
            montoTransaction === null ||
            montoRecibido === null
        ) {
          
          logger.info(
            `Se realiza actualizar registro con idTramite : ${external_reference}, status : ${estado}`
          );
          let response = await this.mercadoPagoCtrl.getPayment( id );
          if ( response && response.body.results != null &&
            response.body.results.length > 0 ) {
            let results = response.body.results[0];
            let status = results.status;
            let monto_total = 0;
            let monto_recibido = 0;
            let fecha_pago        = results.money_release_date;
            let collection_id     = results.id;
            let payment_type      = results.payment_type_id;
            let merchant_order_id = results.order.id;
            let processing_mode   = results.processing_mode;

            if (results.transaction_details != null) {
              monto_total = results.transaction_details.total_paid_amount;
              monto_recibido = results.transaction_details.net_received_amount;
            }
            logger.info(
              `id: ${id} , external_reference : ${id}, status :${status}, fechaPago : ${fecha_pago}, monto_total:${monto_total} , monto_recibido: ${monto_recibido}`
            );

            var data = {
               collection_status :  status,
               fecha_pago : fecha_pago,
               monto_transaction : monto_total,
               monto_recibido : monto_recibido,
               collection_id : collection_id,
               payment_type : payment_type,
               merchant_order_id: merchant_order_id,
               processing_mode
            };

            console.log(data);

            const update = await updateWithDataMercadoPago(id, data);
            logger.info(`Result Pago Online Update : ${update}`);
            // insert registros en reg
            cantidad++;  
          }
        }
      }
      end_time_worker = format(new Date(), "HH:mm:ss");
      
      // agrega un registro de valores de registro_workers
      var data ={
         fecha_ejecucion: fecha_ejecucion,
         start_time_worker: start_time_worker,
         end_time_worker: end_time_worker ,
         cantidad_procesados: cantidad
      };
      await addWorker(data);

    } catch (error) {
      logger.error(`Error procesarPago :${error}`);
    }
  }
}

module.exports = WorkerController;
