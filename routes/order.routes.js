const router = require('express').Router();
const orderControllers = require('../controllers/order.controllers')

router.post('/orders', orderControllers.createOrder);

router.get('/orders', orderControllers.getOrders);

module.exports = router;