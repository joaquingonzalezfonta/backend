const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers')
const validation = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin')
const uploadUser = require('../middlewares/uploadFileUser');

router.get("/users", validation, userControllers.getUsers)

router.post("/users", [ uploadUser, validation, isAdmin ], userControllers.createUser)

// Get de usuario por id: Solo me va a devolver un usuario especifico
router.get("/users/:id", [validation, isAdmin], userControllers.getUserById)
// Delete para borrar un usuario por su id
router.delete("/users/:id", [validation, isAdmin], userControllers.deleteUser);
// Editar usuario 
router.put("/users/:id", [ uploadUser, validation, isAdmin ], userControllers.updateUser)
// Login para autenticar un usuario
router.post("/login", userControllers.login)
// Devolvemos router para que se pueda usar en otros archivos
module.exports = router;