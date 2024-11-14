const Category = require('../models/category.model');


async function getCategories(req, res) {
    try {
        const categories = await Category.find();

        return res.status(200).send({
            message: "Categorias obtenidas correctamente",
            categories
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al obtener categorias"
        })
    }
}

async function createCategories(req, res) {
    try {
        const data = new Category(req.body);

        const category = await data.save()

        return res.status(201).send({
            message: "Categoria creada correctamente",
            category: category
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al crear categorias" 
        })
    }
}

async function deleteCategory(req, res) {
    try {

        const { id } = req.params

        const deleteCategory = await Category.findByIdAndDelete(id)
        return res.status(200).send({
            ok: true,
            message: "La categoria fue borrada correctamente",
            deleteCategory
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al borrar la categoria"
        })
    }
}

module.exports = { getCategories, createCategories, deleteCategory}