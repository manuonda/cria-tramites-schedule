require("dotenv").config();
const express = require("express");
const app     = express();

require("./api/routes")(app);

app.listen(process.env.PORT, () => {
  console.log("listen port :", process.env.PORT);
});
