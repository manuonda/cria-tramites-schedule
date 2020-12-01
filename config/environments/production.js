module.exports = {
    PORT: process.env.PORT,
    DB: {
          user : "postgres",
       password: "mysecretepasword",
       database: "school",
           host: "localhost",
        dialect: "postgres"
    }
}