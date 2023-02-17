
const express = require('express');
const api = express.Router();
const orderController = require('../controllers/order.controller');

api.get('/order/:id?', orderController.getOrder);
api.post('/order', orderController.saveOrder);

module.exports = api;