const express = require('express');
const app = express();
const cors = require('cors')

const user_routes = require('./routes/user.routes');
const product_routes = require('./routes/product.routes')

//Middlewares
//Habilito realizar peticiones desde el navegador a mi backend
app.use(cors())
//Poder leer el body de una petición cuando es un json
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use([
        user_routes,
        product_routes
]);

module.exports = app;