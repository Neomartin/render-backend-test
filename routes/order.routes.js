
const express = require('express');
const api = express.Router();
const orderController = require('../controllers/order.controller');
const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');
//Get order by id
router.get('/orders/:id', orderController.getOrderById);
//Get orders
router.get('/orders', orderController.getOrders);
//Post order
router.post('/orders', orderController.createOrder);
//Put order
router.put('/orders/:id', orderController.updateOrder);
//Delete order
router.delete('/orders/:id', orderController.deleteOrder)


module.exports = api;