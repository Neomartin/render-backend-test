const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");

const user_routes = require('./routes/user.routes');
const product_routes = require('./routes/product.routes');
const order_routes = require('./routes/order.routes');
const category_routes = require('./routes/category.routes');
const upload_routes = require('./routes/upload.routes');
const viewsRoutes = require('./routes/views.routes');

//Middlewares
app.set('view engine', 'ejs');

app.use(express.static("public"));
//Habilito realizar peticiones desde el navegador a mi backend
app.use(cors())
//Poder leer el body de una petición cuando es un json
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(viewsRoutes)
app.use('/api', [
        user_routes,
        product_routes,
        order_routes,
        category_routes,
        upload_routes
]);

module.exports = app;