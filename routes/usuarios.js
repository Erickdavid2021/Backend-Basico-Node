//TENGO LAS RUTAS DE LAS API EN UN ARCHIVO
const { Router }  =  require('express');

const {usuariosGet, usuariosPos,usuariosPut, usuariosDelete} = require('../controllers/usuarios')

const router = Router();

//DESDE LAS RUTAS - LLAMO A LOS CONTROLADORES
router.get('/', usuariosGet);

router.put('/:id', usuariosPut)

router.post('/',usuariosPos)

router.delete('/',usuariosDelete)

module.exports=router;