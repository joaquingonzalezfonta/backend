const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers')
const validation = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin')

router.get("/users", validation, userControllers.getUsers)

router.post("/users", userControllers.createUser)

// Get de usuario por id: Solo me va a devolver un usuario especifico
router.get("/users/:id", [validation], userControllers.getUserById)
// Delete para borrar un usuario por su id
router.delete("/users/:deleteID", [validation, isAdmin], userControllers.deleteUser);
// Editar usuario 
router.put("/users/:updateID", [validation], userControllers.updateUser)
// Login para autenticar un usuario
router.post("/login", userControllers.login)
// Devolvemos router para que se pueda usar en otros archivos
module.exports = router;