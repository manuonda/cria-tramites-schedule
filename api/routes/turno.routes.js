const {Router} =  require('express');
const router =  Router();
const { TurnoController } =  require('../controllers');
const turnoController = new TurnoController();


router.get('/nuevo', turnoController.new);
router.get('/asignar/{id}')