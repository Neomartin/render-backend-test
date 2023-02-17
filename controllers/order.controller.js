const Order = require('../schemas/order.schema');

async function saveOrder(req, res) {
    try {
        console.log(req.body)
        const order = new Order(req.body);
        console.log(order)
        const newOrder =  await order.save();
        if(!newOrder) return res.status(401).send({
            ok: false,
            msg: `Error al crear la nueva orden`
        })
        return res.status(200).send({
            ok: true,
            order,
            msg: `Orden creada correctamente`
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            ok: false,
            msg: `Error al crear la nueva orden`,
        })
    }

} 

async function getOrder(req, res) {
    const query = req.params.id ? Order.findById(req.params.id ) : Order.find();
    try {
        const id = req.params.id;
        const order = await query.populate('products.productId').populate('userId', { password: 0 });
        if(!order) return res.status(401).send({
            ok: false,
            msg: `No se encontró la orden con el id ${id}`
        });

        return res.status(200).send({
            ok: true,
            order,
            msg: `Orden encontrada correctamente`
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            ok: false,
            msg: `Error al obtener la orden`,
        })
    }
}


module.exports = {
    saveOrder,
    getOrder
}