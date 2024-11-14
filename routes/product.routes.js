const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers')
const upload = require('../middlewares/uploadFile');

// Obtener todos los productos
router.get("/products", productController.getProducts)

// Obtener procducto por ID 
router.get("/products/:id", productController.getProductById)

// Crear producto 
router.post("/products",[upload], productController.createProduct)
                        // [validation, isAdmin, upload]

// Actualizar producto
router.put("/products/:id", [upload], productController.updateProduct)

// Borrar producto
router.delete("/products/:id", productController.deleteProduct);


module.exports = router;