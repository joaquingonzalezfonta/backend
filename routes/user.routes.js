const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers')
const validation = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin')
const uploadUser = require('../middlewares/uploadFileUser');

router.get("/users", validation, userControllers.getUsers)

router.post("/users", [ uploadUser, validation, isAdmin ], userControllers.createUser)

router.get("/users/:id", [validation, isAdmin], userControllers.getUserById)

router.delete("/users/:id", [validation, isAdmin], userControllers.deleteUser);

router.put("/users/:id", [ uploadUser, validation, isAdmin ], userControllers.updateUser)

router.post("/login", userControllers.login)

module.exports = router;