const {Router} = require('express');
const bodyParser = require('body-parser')
const cors  = require('cors')
const compression    = require('compression');
const userRoutes     = require('./user.routes');
const tramiteRoutes  = require('./tramite.routes');

module.exports = (app ) => {

  const router = Router()
  const apiRouter =  Router()

  app.use(cors())
     .use(compression());

  // definition of router
  router.use('/user', userRoutes)
  router.use('/tramite', tramiteRoutes)
  
  // router access 
  apiRouter.use("/api", router); //api/user
  app.use(apiRouter);
}