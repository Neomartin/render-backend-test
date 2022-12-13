const User = require('../schemas/user.schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Funciones de Leer
async function obtenerUsuarios(req, res) {
    const usersFromDB = await User.find();
    console.log(usersFromDB);
    res.send(usersFromDB);
}

//Funciones de Crear (Registrar)
const agregarUsuario = async(req, res) => {
    try {

        let password = req.body.password;
        //Proba ejecutar todo lo que necesites siempre que no hayan errores
        const userToSave = new User(req.body);

        userToSave.email = userToSave.email.toLowerCase();

        //Guarda en la base de datos el usuario con los datos recibidos en la req.body
        const hash = await bcrypt.hash(password, saltRounds)
        
        userToSave.password = hash;

        return res.send({
            msg: `El usuario ha sido creado correctamente`,
            ok: true
        })

        // const userSaved = await userToSave.save();

    } catch (error) {
        console.log(error)
        res.send({
            msg: `No se pudo guardar el usuario`,
            ok: false
        })
    }




    

}

//Funciones de Leer usuario específico
async function obtenerUsuarioEspecifico(req, res) {
    console.log(req.params);
    res.send(`Params`)
}
//Funciones de Borrar usuario

//Funciones de Editar usuario

//Funciones de Login

module.exports = {
    obtenerUsuarios,
    agregarUsuario,
    obtenerUsuarioEspecifico
    // masFunciones
}