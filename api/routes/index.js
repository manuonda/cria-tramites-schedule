const {Router} = require('express');
const bodyParser = require('body-parser')
const cors  = require('cors')
const compression    = require('compression');
const userRoutes     = require('./user.routes');
const tramiteRoutes  = require('./tramite.routes');
const pagoRoutes     = require('./pago.routes');
const turnoRoutes    = 


module.exports = (app ) => {

  const router = Router()
  const apiRouter =  Router()

  app.use(cors())
     .use(compression());
  
     

  // definition of router
  router.use('/users', userRoutes);
  router.use('/tramites', tramiteRoutes);
  router.use('/mercadopago', pagoRoutes);
  route.use('./turnos', tr)
  
  // router access 
  apiRouter.use("/api", router); //api/user
  app.use(apiRouter);
}