const express = require('express')
const router = express.Router();
const viewsController = require('../controllers/views.controllers.js');


//La definicion de todas las rutas vistas y sus respectivos controladores
router.get('/', (req, res) => 
            res.render('index', { title: 'Index template EJS'}));


router.get('/contact', (req, res) => {
    

    return res.render('contact')


});


module.exports = router;
