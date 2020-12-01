// const{PORT} = require('./config/environments')
const container = require('./api/container')

const application =  container.resolve("app")
application.start().catch(err => {
   console.error(err);
   process.exit();
});
