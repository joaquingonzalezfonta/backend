const Budget = require('../models/budget.model')


async function getBudget(req, res) {
    try {
        const budget = await Budget.find();

        return res.status(200).send({
            message: "presupuesto obtenido correctamente",
            budget
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al obtener presupuesto"
        })
    }
}

async function createBudget(req, res) {
    try {
        const data = new Budget(req.body);

        const budget = await data.save()

        return res.status(201).send({
            message: "Presupuesto creado correctamente",
            budget: budget
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al crear presupuesto" 
        })
    }
}

async function deleteBudget(req, res) {
    try {

        const { id } = req.params

        const deleteBudget = await Budget.findByIdAndDelete(id)
        return res.status(200).send({
            ok: true,
            message: "El presupuesto fue borrado correctamente",
            deleteBudget
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al borrar el presupuesto"
        })
    }
}

module.exports = { getBudget, createBudget, deleteBudget }