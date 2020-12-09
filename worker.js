const WorkerController  = require('./workers/worker.controller');
const worker = new WorkerController();
const logger =  require('./config/library/logger');
try{
    logger.info('Init Operacion worker');
    worker.execute();
}catch(error) {
    logger.error(`Error init method execute :${error}`);
}

