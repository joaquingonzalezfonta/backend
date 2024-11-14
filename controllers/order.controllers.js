const Order = require('../models/order.model')

async function createOrder(req, res) {

    try {
        
        const order = new Order(req.body)

        const newOrder = await order.save();

        return res.status(201).send({
            message: 'Order created',
            newOrder
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'internal server error'})
    }
}

async function getOrders(req, res) {
    try {
        const orders = await Order.find()
                                        .populate('user', "name email")
                                        .populate('products.product', 'name price image')

        return res.status(200).send({
            message: 'Orders obtenidas',
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal server error'})
    }
}


module.exports = {
    createOrder,
    getOrders
}