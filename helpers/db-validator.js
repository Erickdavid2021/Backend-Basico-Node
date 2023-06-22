const Role = require ('../models/role');
const Usuario  = require('../models/usuario');

const esRoleValido = async(rol = '')=> {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}

//Verificar si el correo existe 
const esMailValido = async(correo ='')=>{
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg:"El correo ya existe"
        })
    }
}

//Verificar si el id existe
const esIdlValido = async(id ='')=>{
    const existeId = await Usuario.findOne({ id });
    if (!existeId) {
        return res.status(400).json({
            msg:"El id no existe"
        })
    }
}


module.exports={
    esRoleValido,
    esMailValido,
    esIdlValido
}