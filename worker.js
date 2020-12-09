const WorkerController  = require('./workers/worker.controller');
const worker = new WorkerController();

try{
    console.log("worker ejecutar");
    worker.ejecutar();
}catch(error) {
   console.error(error);
}

