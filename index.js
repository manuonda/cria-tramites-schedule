require("dotenv").config();
const express     = require("express");
const app         = express();
const bodyParser  = require('body-parser')
const schedule    = require('node-schedule')

app.use(bodyParser.json());

// configuration 
require('./config/library/util')(app)

// routes
require("./api/routes")(app);





try {
app.listen(process.env.PORT, () => {
    console.log("listen port :", process.env.PORT);
  }); 
} catch (error) {
  console.error(`Error start project : ${error}`);
}
