const express = require('express');	
const router = express.Router();

const categoryController = require('../controllers/category.controller.js');

// Leer categorias
router.get('/category', categoryController.getCategories);

// Crear categoria
router.post('/category', categoryController.createCategory);

// router.get('/subcategories/:idParent', categoryController.createCategory)

module.exports = router