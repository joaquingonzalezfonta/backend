function isAdmin(req, res, next) {

    if(req.user.role !== "admin") {
        return res.status(403).send({
            mssage: "No tienes permiso para acceder a este recurso"
        })
    }

    next();
}

module.exports = isAdmin