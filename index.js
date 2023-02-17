const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();
const port = process.env.PORT || 3200;
const URL = process.env.MONGO_URL;


async function dbConnect() {
    // Conectarnos a la Base de datos la palabra reservada await cuando la función es ASYNC me permite pausar la ejecución de la siguiente línea hasta que se haya resuelto la petición asincrona
    mongoose.set('strictQuery', false);

    await mongoose.connect(URL)
    
    console.log(`\x1b[93m Conexión a la DB correcta!!! \x1b[37m`);
    app.listen(port, ()=> {
        console.log(`\x1b[95m Servidor express escuchando en el puerto ${port} \x1b[37m`)
    })
}

dbConnect().catch(error => console.error(`Error al conectar con la DB`, error));