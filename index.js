const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/products', (req, res) => {

    // fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(resp => resp.json())
    //     .then(users => {
    //         res.send(users)
    //     })
    const users = [
        {
            name: `Usuario 1`,
            active: true
        },
        {
            name: `Usuario 2`,
            active: true
        }
    ]
    res.send(users)

})

app.listen(port, ()=> {
    console.log(`Servidor express escuchando en el puerto ${port}`)
})


// M = MongoDB
// E = Express
// R = React
// N = NodeJS