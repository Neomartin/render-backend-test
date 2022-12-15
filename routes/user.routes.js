const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller')

//Leer usuario
api.get('/users', userController.obtenerUsuarios);

//Crear (Registrar)
api.post('/users', userController.agregarUsuario)

//Leer usuario específico
api.get('/users/:nombreDelParametro', userController.obtenerUsuarioEspecifico)

//Borrar usuario
api.delete('/users/:nombreParamId', userController.borrarUsuario)

//Editar usuario

//Login
module.exports = api;