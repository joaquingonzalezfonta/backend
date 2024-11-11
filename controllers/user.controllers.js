const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
// Funciones para manejar distintas peticiones

async function getUsers(req, res) {

    try {

        const users = await User.find(); // asyncrono

        console.log(users)

        return res.status(200).send(users);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener usuarios")
    }
}

async function createUser(req, res) {

    if (!req.body.password) {
        return res.status(400).send({
            ok: false,
            message: "La contraseña es requerida"
        })
    }

    const user = new User(req.body);

    bcrypt.hash(user.password, saltRounds, (error, hash) => {

        if (error) {
            console.log(error);
            return res.status(500).send({
                ok: false,
                message: "Error al crear usuario"
            })
        }

        user.password = hash;

        user.save().then((nuevoUser) => {

            console.log(nuevoUser);
            res.status(201).send(nuevoUser)
        }).catch(error => {
            
            console.log(error);
            res.send("El usuario no se pudo crear")
        })
    })
}

// Funcion para obtener un usuario especifico
async function getUserById(req, res) {
    try {
        const { id } = req.params;

        if(req.user.role !== "admin" && id !== req.user._id) {
            return res.status(403).send({
                message: "No tienes permisos para acceder a este usuario"
            })
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send({
                message: "El usuario no fue encontrado",
                ok: false
            })
        }

        user.password = undefined;

        return res.status(200).send({
            ok: true,
            message: "El usuario fue encontrado",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al obtener usuario en la DB")
    }
}

// Funcion borrar usuario
async function deleteUser(req, res) {

    try {

        // if(req.user.role !== "admin") {
        //     return res.status(401).send({
        //         ok: false,
        //         message: "No tienes permiso para borrar usuarios"
        //     })
        // }

        const { deleteID } = req.params

        const deletedUser = await User.findByIdAndDelete(deleteID)

        return res.status(200).send({
            ok: true,
            message: "El usuario fue borrado correctamente",
            deletedUser
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            message: "Error al borrar el usuario"
        })
    }
}

// Actualizar usuario
async function updateUser(req, res) {
    try {

        const { updateID } = req.params

        if(req.user.role !== "admin" && updateID !== req.user._id) {
            return res.status(403).send({
                message: "No tienes permisos para actualizar este usuario"
            })
        }

        // TODO: Remover la propiedad password del body

        const user = await User.findByIdAndUpdate(updateID, req.body, { new: true })
                                                // La opcion new: true me devuelve el usuario actualizado
        return res.status(200).send({
            ok: true,
            message: "Usuario actualizado correctamente",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            message: "Error al actualizar usuario"
        })
    }
}

async function login(req, res) {
    try {
        
        const { email, password } = req.body;
        console.log(email, password);

        if(!email || !password) {
            return res.status(400).send({
                message: "Email y contraseña son requeridos"
            })
        }

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).send({
                message: "Alguno de los datos no es correcto"
            })
        }

        const match = await bcrypt.compare(password, user.password)

        // console.log(" Compare match", match);

        if(!match) {
            return res.status(400).send({
                message: "Alguno de los datos es incorrecto"
            })
        }

        // Eliminar la propiedad password
        user.password = undefined;
        user.__v = undefined;

        const token = jwt.sign(user.toJSON(), SECRET, {
            expiresIn: '1h'
        })

        console.log(token)



        return res.send({
            message: "Login exitoso",
            user,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error al autenticar usuario" })
    }
}

module.exports = {
    getUsers, createUser, getUserById, deleteUser, updateUser, login
}