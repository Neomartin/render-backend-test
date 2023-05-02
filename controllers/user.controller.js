const User = require('../schemas/user.schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { assignPermissions } = require('../utils/role.utils');
const secret = '4lfa_b3t4!';

//Funciones de Leer
async function obtenerUsuarios(req, res) {
    const page = req.query.page;  //numero de pagina que estoy consultando
    const limit =  3; //limite de resultados a buscar **req.query.limit || limit
    try {
        const usersFromDB = await User.find({}, { password: 0 })
        //collation es para que no discrimine mayusculas de minusculas en el ordanimiento 
                                    .collation({ locale:  'es' })
                                    .sort({age: -1})
                                    .limit(limit)
                                    .skip(page * limit);

        console.log(`Longitud de la búsqueda`, usersFromDB.length);


        const totalUsers = await User.countDocuments();
        console.log(`Total de usuario en la DB`, totalUsers)

        res.send(
            {
                msg: `Usuarios obtenidos correctamente`,
                ok: true,
                users: usersFromDB,
                total: totalUsers
            }
        );
    } catch (error) {
        console.log(error)
        res.status(400).send(
            {
                msg: `No se pudieron obtener los usuarios`,
                ok: false,
            }
        );
    }
    
}

//Funciones de Crear (Registrar)
const crearUsuario = async(req, res) => {
    try {

        let password = req.body.password;
        //Proba ejecutar todo lo que necesites siempre que no hayan errores
        const userToSave = new User(req.body);

        userToSave.email = userToSave.email.toLowerCase();

        //Manejo de roles y permisos
        if(req.user.role !== 'superadmin' || req.user.role !== 'admin') {
            userToSave.role = 'customer'
        }

        userToSave.permissions = assignPermissions(userToSave.role);


        // Checkeo si el usuario que estoy intentando registrar ya existe, de se así no continuo con el guardado y corto la ejecución de la request
        const emailExist = await User.findOne({ email:  userToSave.email });

        if(emailExist) {
            return res.status(400).send(`El email ya se encuentra utilizado`)
        }

        //Guarda en la base de datos el usuario con los datos recibidos en la req.body
        const hash = await bcrypt.hash(password, saltRounds);
        
        userToSave.password = hash;
        
        const userSaved = await userToSave.save();

        userSaved.password = undefined;

        return res.status(201).send({
            msg: `El usuario ha sido creado correctamente`,
            ok: true,
            user: userSaved
        })


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
    try {
        console.log(req.params);
        // Recibo en la peticion el ID del usuario que quiero buscar
        const id = req.params.nombreDelParametro;
        const findUser = await User.findById(id, { password: 0 });

        // Si no existe usuario devuelvo otro msg
        if(!findUser) {
            return res.status(404).send({
                msg: `Usuario NO encontrado`,
                ok: false
            })
        }

        return res.status(200).send({
            msg: `Usuario encontrado`,
            ok: true,
            user: findUser
        })
    } 
    catch(error) {
        return res.status(400).send({
            msg: `Error al obtener usuario`,
            ok: false,
            error
        })
    }
    
}

//Funciones de Borrar usuario
async function borrarUsuario(req, res) {
    try {
        const id = req.params.nombreParamId;

        const userDeleted = await User.findByIdAndDelete(id);

        if(!userDeleted) return res.status(404).send({
            msg: `No se encontro el usuario a borrar`,
            ok: false
        })

        return res.status(200).send({
            msg: `El usuario fue borrado correctamente`,
            ok: true,
            user: {
                name: userDeleted.name,
                email: userDeleted.email
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            msg: `Error al borrar usuario`,
            ok: false
        })
    }
    

    
}
//Funciones de Editar usuario
async function actualizarUsuario(req, res) {
    try {
        const id = req.params.id;

        // Buscamos si el usuario existe
        const user = await User.findById(id);

        if(!user) {
            return formatResponse(res, 404, `No se encontró usuario`, false)
        }

        const update = req.body;

        update.password = undefined;

        if(update.password) {
            const hash = await bcrypt.hash(update.password, saltRounds);

            update.password = hash;
        }
        
        // Actualizar datos del usuario
        const userUpdated = await User.findByIdAndUpdate(id, update, { new: true }).select({ password: 0 })

        console.log(userUpdated)

        return res.status(200)
                  .send({   msg: `Actualizar usuario: ${id}`,
                            ok: true,
                            user: userUpdated
                        })

    } catch (error) {
        console.log(error);
        return res.status(400).send(`Error al actualizar usuario`)
    }
}

function formatResponse(res, code, msg, ok) {
    return res.status(code).send({ msg, ok });
}


//Funciones de Login
async function loginUsuario(req, res) {
    try {
        //Recibir datos del usuario que intenta loguearse (body)
        const emailBody = req.body.email;
        const passwordBody = req.body.password;
        //Buscar si existe un usuario con ese email
        const user = await User.findOne({email: emailBody })
        //El usuario no existe devuelvo que no se encontro usuario
        if(!user) {
            return res.status(404).send(`Login incorrecto alguno de los datos es incorrecto`)
        }

        //Existe usuario comparo el password  que me envió en el login con el que tiene mi usuario en la DB
        const result = await bcrypt.compare(passwordBody, user.password);

        // La persona se logueo correctamente
        if(!result) {
            return res.status(404).send({
                msg: 'Login incorrecto alguno de los datos es incorrecto',
                ok: false
            })   
        }
        //Remuevo el password del user
        user.password = undefined
        // Como la persona es quien dice ser, necesito generar un JWT
        const token = await jwt.sign(user.toJSON(), secret, { expiresIn: '2h'});

        return res.status(200).send({
            msg: 'Login correcto',
            ok: true,
            token,
            user
        })


    } catch (error) {
        console.log(error);
        res.status(400).send({
            msg: `Error al intentar loguearse`,
            ok: false
        })
    }

    

}


// Funcion de busqueda con filtro
async function obtenerUsuariosFiltrados(req, res) {

    try {

        const queryParams = req.query;
        const name = queryParams.name || '';
        const age = queryParams.age || 0;

        const users = await User.find({ 
                                    'name': {
                                        "$regex": name,
                                        "$options": 'i'
                                    },
                                    $and: [
                                    {  'age': { "$gte": age } },
                                    //    {  'age': { "$lte": "50" } },
                                    ]

                                })
                                .select({ password: 0 })
                                .sort({ name: "desc" })

        console.log(users)
        return res.send(users);
    } catch (error) {
        console.log(error);
        res.send(`Error al obtener usuarios filtrados`)
    }

}

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuarioEspecifico,
    borrarUsuario,
    obtenerUsuariosFiltrados,
    loginUsuario,
    actualizarUsuario
    // masFunciones
}