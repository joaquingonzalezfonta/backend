const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers')
const upload = require('../middlewares/uploadFile');

// Obtener todos los productos
router.get("/products", productController.getProducts)

// Obtener procducto por ID 
// Crear producto 
router.post("/products",[upload], productController.createProduct)
                        // [validation, isAdmin, upload]
// Actualizar producto
// Borrar producto












module.exports = router;