const express = require('express');
const api = express.Router();

const productController = require('../controllers/product.controller');
const uploadController = require('../controllers/upload.controller');

//Leer
api.get('/products', productController.obtenerProductos)

// Buscar productos bajo ciertos parametros


//Crear
api.post('/product', uploadController.uploadProduct ,productController.agregarProductos);
//Leer productos específico
api.get('/product/:id', productController.obtenerProducto)
//Borrar producto
//Editar producto

module.exports = api;