//TENEMOS LOS CONTROLADORES QUE SON LOS QUE DAN RESPUSTA A LAS PETICIONES 

const { request,response } = require('express');

const bcryptjs = require('bcryptjs')

const Usuario  = require('../models/usuario');


    const usuariosGet = async(req = request, res = response) => {
        //Parametros de segmentos y req.query donde esta el request
       // const {saludo,nombre ='',apikey} = req.query;
        const {limite = 5, desde = 0} = req.query;
        // const usuarios = await Usuario.find({estado : true})
        //                 .skip( Number(desde) )
        //                 .limit(Number(limite));

        //const totalregistro = await Usuario.countDocuments({estado : true});                        

        //Usamos la promesa para que se ejcuten ambas acciones al mismo tiempo , esto es un arrreglo de promesas
        const [totalregistro,usuarios] = await Promise.all([
            Usuario.countDocuments({estado : true}),
            Usuario.find({estado : true})
                         .skip( Number(desde) )
                         .limit(Number(limite))
        ]);

        res.json({
            msg:'get api-Controlador',
            totalregistro,
            usuarios
        })

    };

    const usuariosPut = async(req, res = response)=> {
        const id = req.params.id;
        const{_id,password , google , correo ,...resto} = req.body;
        
        //Validar contra BD
        if(password){
            const salt = bcryptjs.genSaltSync(10);
            resto.password = bcryptjs.hashSync( password,salt );
        }
        
        const usuarioactualizado = await Usuario.findByIdAndUpdate(id,resto);

        res.json({
            msg:'put api-Controller',
            usuarioactualizado
        })
    
    }

    const usuariosPos = async (req, res = response)=> {
        

        const { nombre,correo,password,rol } = req.body;
        const usuario = new Usuario({nombre,correo,password,rol});

        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync( password,salt );

        //Guardar en BD
        await usuario.save();

        res.json({
            msg:'pos api-Controller',
            usuario
        })
    
    }
    
    const usuariosDelete = async(req, res = response)=> {
       const { id } = req.params;
       
       const usuario = await Usuario.findByIdAndUpdate( id , {estado:false});
       res.json({
            msg:'put api-Delete',
            usuario
        })
    
    }
module.exports= {
    usuariosGet,
    usuariosPut,
    usuariosPos,
    usuariosDelete

}    