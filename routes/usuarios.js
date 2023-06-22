//TENGO LAS RUTAS DE LAS API EN UN ARCHIVO
const { Router }  =  require('express');

const {usuariosGet, usuariosPos,usuariosPut, usuariosDelete} = require('../controllers/usuarios');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const { esRoleValido,esMailValido, esIdlValido } = require('../helpers/db-validator')

const router = Router();

//DESDE LAS RUTAS - LLAMO A LOS CONTROLADORES
router.get('/', usuariosGet);

router.put('/:id',
[check('id','No es un id Valido').isMongoId(),
check('id').custom( esIdlValido ),
check('rol').custom( esRoleValido ),
validarCampos],
 usuariosPut)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    //  check('password','El password es obligatorio y mayor de 6 letras').not().isEmpty(),
    check('password','El password es obligatorio y mayor de 6 letras').isLength({ min:6 }),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( esMailValido ),
   // check('rol','No es un Rol valido').isIn([ 'ADMIN_ROLE','USER_ROLE' ]),
    check('rol').custom( esRoleValido ),
    validarCampos,
],usuariosPos)

router.delete('/:id',
[check('id','No es un id Valido').isMongoId(),
 //check('id').custom( esIdlValido ),
 validarCampos]
,usuariosDelete)

//EXPORTO EL MODULO SIEMPRE
module.exports=router;