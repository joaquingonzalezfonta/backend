const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET;

function validation(req, res, next) {

    // Si el tokn viene con el squema Bearer vamos a separar el token de la palabra Bearer
    // const token = req.headers.authorization.split(" ")[1];

    const token = req.headers.authorization;

    // Si no viene el token devolvemos un mensaje de error
    if (!token) {
        return res.status(401).send({
            message: "No tiene autorizacion para acceder a este endpoint"
        })
    }

    jwt.verify(token, SECRET, (error, payload) => {

        if(error) {
            console.log(error)
            return res.status(401).send({
                message: "No tiene autorizacion para acceder aqui"
            })
        }

        // En el payload se encuentra la informacion del usuario sin modificar
        console.log(payload)

        req.user = payload;

        next();
    })

}

module.exports = validation