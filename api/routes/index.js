const {Router} = require('express');
const bodyParser = require('body-parser')
const cors  = require('cors')
const compression = require('compression')

module.exports = function({ UserRoutes}) {
  const router = Router()
  const apiRouter =  Router()

  apiRouter.use(cors())
           .use(compression);

  apiRouter.use('/user', UserRoutes)
  router.use("/api", apiRouter); //api/user
}