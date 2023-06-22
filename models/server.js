const express = require('express')
var cors = require('cors')

const {dbConnection} = require('../database/config')

class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Conectar a Base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        
        //Para recibir Json
        this.app.use( express.json () );

        // Directorio Público
        this.app.use( express.static('public') );
    }


    routes(){
        //rutas disponibles para la url
        this.app.use( this.usuariosPath, require('../routes/usuarios'))   
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('Sevidor corriendo en puerto:', this.port )
        } );
    }

}

module.exports=Server;