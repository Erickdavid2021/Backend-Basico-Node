//TENEMOS LOS CONTROLADORES QUE SON LOS QUE DAN RESPUSTA A LAS PETICIONES 

const { response } = require('express');

    const usuariosGet = (req, res = response) => {
        //Parametros de segmentos y req.query donde esta el request
        const {saludo,nombre ='Pedro',apikey} = req.query;

        res.json({
            msg:'get api-Controlador',
            saludo,
            nombre,
            apikey
        })

    };

    const usuariosPut = (req, res = response)=> {
        const id = req.params.id;
        res.json({
            msg:'put api-Controller',
            id : id
        })
    
    }

    const usuariosPos = (req, res = response)=> {
        
        const {nombre,edad} = req.body;
        res.json({
            msg:'pos api-Controller'
            ,nombre
            ,edad
        })
    
    }
    
    const usuariosDelete = (req, res = response)=> {
       
        res.json({
            msg:'put api-Delete'
        })
    
    }
module.exports= {
    usuariosGet,
    usuariosPut,
    usuariosPos,
    usuariosDelete

}    