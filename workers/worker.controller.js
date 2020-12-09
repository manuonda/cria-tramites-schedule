const logger = require("../config/library/logger");
import { format, compareAsc } from "date-fns";

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
      //
      const row = await lastWorkerRow();
      if (Array.isArray(row) && row.length > 0) {
        console.log("aqui ingreso ");
      } else {
        // no existe worker ejecutado
        const rows = await findRowNoProcesados();
        if (rows && rows.length > 0) {
        }
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
      let fecha_ejecucion = format(new Date(), "dd/MM/yyyy");

      start_time_worker = format(new Date(), "HH:mm:ss");
      for (let i in rows) {
        if (idFirstResultadoPagoOnline === null) {
          idFirstResultadoPagoOnline = rows[i].id;
        }
        if (i === rows.length - 1) {
          idLastResultadoPagoOnline = rows[i].id;
        }

        let id = rows[i].id;
        let external_reference = rows[i].external_reference;
        let estado = rows[i].collection_status;
        let fechaPago = rows[i].fecha_pago;
        let montoTransaction = rows[i].monto_transaction;
        let montoRecibido = rows[i].monto_recibido;
        logger.info(
          `Estado ${estado} , fechaPago : ${fechaPago} , montoTransaction :${montoTransaction} , montoRecibido :${montoRecibido}`
        );

        if (
          estado !== "approved" ||
          montoTransaction === null ||
          montoRecibido === null
        ) {
          logger.info(
            `Se realiza actualizar registro con idTramite : ${external_reference}, status : ${estado}`
          );
          let response = await this.mercadoPagoCtrl.getPayment(
            external_reference
          );
          if (
            response &&
            response.body.results != null &&
            response.body.results.length > 0
          ) {
            let results = response.body.results[0];
            let status = results.status;
            let monto_total = 0;
            let monto_recibido = 0;
            let fecha_pago = results.money_release_date;
            if (results.transaction_details != null) {
              monto_total = results.transaction_details.total_paid_amount;
              monto_recibido = results.transaction_details.net_received_amount;
            }
            logger.info(
              `id: ${id} , external_reference : ${external_reference}, status :${status}, fechaPago : ${fecha_pago}, monto_total:${monto_total} , monto_recibido: ${monto_recibido}`
            );
            const update = await updateWithDataMercadoPago(
              id,
              external_reference,
              status,
              fecha_pago,
              monto_total,
              monto_recibido
            );
            logger.info(`Result Pago Online Update : ${update}`);
          }
        }
      }
      end_time_worker = format(new Date(), "HH:mm:ss");
    } catch (error) {
      logger.error(`Error procesarPago :${error}`);
    }
  }
}

module.exports = WorkerController;
