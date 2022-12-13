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


module.exports = {
    obtenerProductos,
    agregarProductos
}