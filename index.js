const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const dbPassword = 'alfab3ta';
const URL = `mongodb+srv://neotech:${dbPassword}@ecommerce.2qy88.mongodb.net/10i-DB`;
const User = require('./user.schema');

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

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/products', (req, res) => {
    const products = [
        {
            name: `Jabon Dove`,
            active: true,
            price: 350
        },
        {
            name: `Jabon Ala`,
            active: true,
            price: 200
        }
    ]
    res.send(products)
});

app.get('/users', async(req, res) => {
    const usersFromDB = await User.find();
    console.log(usersFromDB);
    res.send(usersFromDB);
})




// M = MongoDB
// E = Express
// R = React
// N = NodeJS