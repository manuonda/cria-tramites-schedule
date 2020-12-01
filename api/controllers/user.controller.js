class UserController {

   constructor(){}
   
   sayHello(req,res) {
       return res.send({message: "Hola Mundo"})
   }

}

module.exports = UserController