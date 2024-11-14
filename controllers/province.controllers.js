const Province = require('../models/province.model');


async function getProvinces(req, res) {
    try {
        const provinces = await Province.find();

        return res.status(200).send({
            message: "Provincias obtenidas correctamente",
            provinces
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al obtener provincias"
        })
    }
}

async function createProvinces(req, res) {
    try {
        const data = new Province(req.body);

        const province = await data.save()

        return res.status(201).send({
            message: "Provincia creada correctamente",
            province: province
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error al crear provincias" 
        })
    }
}

async function deleteProvince(req, res) {
    try {

        const { id } = req.params

        const deleteProvince = await Province.findByIdAndDelete(id)
        return res.status(200).send({
            ok: true,
            message: "La provincia fue borrada correctamente",
            deleteProvince
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al borrar la provincia"
        })
    }
}

module.exports = { getProvinces, createProvinces, deleteProvince }