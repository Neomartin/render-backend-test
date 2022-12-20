function obtenerProductos(req, res) {
    const products = [
        {
            name: `Jabon Dove`,
            active: true,
            price: 350
        },
        {
            name: `Jabon Ala`,
            active: true,
            price: 200
        }
    ]
    res.send(products)
}

function agregarProductos(req, res) {
    // logica interna
}

async function obtenerProductosFiltrados(req, res) {
    try {
        //Lógica 
        





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
    obtenerProductosFiltrados
}