const jwt = require('jsonwebtoken');
const secret = '4lfa_b3t4!';

function jwtVerify(req, res, next) {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(400).send({
            msg: `Token inexistente`,
            ok: false
        })
    }

    jwt.verify(token, secret, (error, payload) => {
        if(error) {
            console.log(error)
            return res.status(401).send({
                msg:"Token inválido",
                ok: false
            })
        }

        console.log(`Payload`)
        console.log(payload);


        req.user = payload

        next();
    })


    
}

module.exports = jwtVerify;