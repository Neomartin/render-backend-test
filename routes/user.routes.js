const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller')

//Leer TODOS los usuarios
api.get('/users', userController.obtenerUsuarios);

//Crear (Registrar)
api.post('/users', userController.agregarUsuario)

//Leer usuario específico
api.get('/users/:nombreDelParametro', userController.obtenerUsuarioEspecifico)

//Borrar usuario
api.delete('/users/:nombreParamId', userController.borrarUsuario);

// Editar
api.put('/users/:id', userController.actualizarUsuario);

// Busqueda de usuario bajo varios filtros
api.get('/users-filter', userController.obtenerUsuariosFiltrados)

//Login
api.post('/login', userController.loginUsuario)



module.exports = api;