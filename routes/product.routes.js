const express = require('express');
const api = express.Router();

const productController = require('../controllers/product.controller');

//Leer
api.get('/products', productController.obtenerProductos)

//Crear

//Leer productos específico

//Borrar producto

//Editar producto

module.exports = api;