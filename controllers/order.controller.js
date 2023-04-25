const Order = require('../schemas/order.schema');
const Product = require('../schemas/product.schema')


const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        order.totalPrice = await verifyOrderAndCalculate(req.body.orderProducts);

        //TODO: remove
        order.userId = req.user?._id || '6413b9ebe6388a06e13905d9';
        
        const newOrder = await order.save();

        if(!newOrder) throw new Error('Error al crear la orden');

        return res.status(200).send(newOrder)
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error instanceof Error ? error.message : 'Error al crear la orden')
    }
}

async function getOrders(req, res) {
    try {
        const orders = await Order.find().populate('orderProducts.product', { name: 1, price: 1 });
        if(!orders) throw new Error('Error al obtener las ordenes');

        return res.status(200).send(orders)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error instanceof Error ? error.message : 'Error al obtener las ordenes')
    }
}

async function getOrderById(req, res) {
    try {
        const id = req.params.id;
        const order = await Order.findById(id).populate('orderProducts.product', { name: 1, price: 1 });
        if(!order) throw new Error('Error al obtener la orden');
        return res.status(200).send(order)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error instanceof Error ? error.message : 'Error al obtener la orden')
    }

}

async function verifyOrderAndCalculate(orderProducts) {
        let total = 0;	
        for (const prod of orderProducts) {
            const product = await Product.findById(prod.product);

            if(!product) throw new Error('Producto no encontrado');
    
            // check stock
            // if(product.stock < orderProduct.quantity) throw new Error('No hay suficiente stock');
            if(product.price !== prod.price) throw new Error('El precio del producto no coincide');
            total += prod.price * prod.quantity;
        };
        return total;
}

async function deleteOrder(req, res) {
    try {
        const id = req.params.id;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if(!deletedOrder) throw new Error('Error al eliminar la orden');
        return res.status(200).send(deletedOrder)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error instanceof Error ? error.message : 'Error al eliminar la orden')
    }
}

async function updateOrder(req, res) {
    try {
        const id = req.params.id;
        const order = req.body;
        order.totalPrice = await verifyOrderAndCalculate(order.orderProducts);
        const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true });
        if(!updatedOrder) throw new Error('Error al actualizar la orden');
        return res.status(200).send(updatedOrder)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error instanceof Error ? error.message : 'Error al actualizar la orden')
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getOrders,
    deleteOrder,
    updateOrder
}