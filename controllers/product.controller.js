const Product = require('../schemas/product.schema');

async function obtenerProductos(req, res) {
    try {
        const products = await Product.find();
        // console.log(products)
        return res.status(200).send({
            ok: true,
            msg: `Productos obtenidos correctamente`,
            products
        })
        
    } catch (error) {
        // console.log(error)
        return res.status(200).send({
            ok: false,
            msg: `No se pudieron obtener los productos`,
            error
        })
    }
}

async function agregarProductos(req, res) {
    try {
        const product = new Product(req.body);
        await product.save();
    
        return res.status(200).send({
            ok: true,
            msg: `Producto agregado correctamente`,
            product
        })
        
    } catch (error) {
        return res.status(200).send({
            ok: false,
            msg: `No se agregó el productop`,
            error
        })
    }
}

async function obtenerProducto(req, res) {
    console.log('iamado')
    try {
        const product = await Product.findById(req.params.id);

        // if(!product) return res.status(404).send({
        //     msg: `No se encontro el producto`,
        //     ok: false
        // });

        return res.status(200).send({
            msg: `Producto encontrado`,
            ok: true,
            product
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            msg: `Error al obtener productos`,
            ok: false
        })
    }
}



module.exports = {
    obtenerProductos,
    agregarProductos,
    obtenerProducto
}