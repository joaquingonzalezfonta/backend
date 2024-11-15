const Product = require('../models/product.model')


async function getProducts(req, res) {
    console.log(" Test")
    try {

        const limit = parseInt(req.query.limit)  || 16;
        const skip = parseInt(req.query.skip) || 0;
        const filter = [];

        if(req.query.name) {
            filter.push({ name: { $regex: req.query.name, $options: 'i'} });
        }

        if(req.query.min_price) {
            filter.push({ price: { $gte: req.query.min_price } });
        }
        
        const query = filter.length > 0 ? { $and: filter } : {};

        const products = await Product.find(query)
        .select({__v: 0})
        .sort({name: 1})
        .collation({locale: 'es'})
        .limit(limit)
        .skip(limit * skip);

        const total = await Product.countDocuments(query);

        return res.status(200).send({
            message: "Productos obtenidos corectamente",
            products,
            total
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error al obtener los productos"
        })
    }

}

async function createProduct(req, res) {
    
    try {

        const product = new Product(req.body)

        if(req.file) {
            product.image = req.file.filename;
        }

        const newProduct = await product.save()

        return res.status(201).send({ 
            message: 'Producto creado correctamente',
            product: newProduct
        })

    } catch (error) {

        console.log(error)
        return res.status(500).send({ message: 'Error al crear el producto'})    }

    }

async function getProductById(req, res) {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if(!product) {
            return res.status(404).send("El producto no fue encontrado")
        }

        console.log(product)

        return res.status(200).send(product)
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al obtener producto en la DB")
    }
} 

async function deleteProduct(req, res) {
    try {

        const { id } = req.params

        const deleteProduct = await Product.findByIdAndDelete(id)
        return res.status(200).send({
            ok: true,
            message: "El producto fue borrado correctamente",
            deleteProduct
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al borrar el producto"
        })
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params 

        const product = req.body;

        if(req.file) {
            product.image = req.file.filename;
        }

        const productUpdate = await Product.findByIdAndUpdate(id, req.body, { new: true })

        console.log(productUpdate)

        return res.status(200).send({
            ok: true,
            message: "Usuario actualizado correctamente",
            productUpdate
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al actualizar producto"
        })
    }
}




module.exports = {
    getProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct
}