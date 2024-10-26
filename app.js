const express = require('express');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/user.routes');

const productsRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')

//Habilitar los CORS para poder hacer peticiones desde cualquier origen
app.use( cors() )

// Compatir la carpeta public
app.use(express.static('public'))

// Habilitamos el metodo json para poder leer los datos del body en una request
app.use( express.json() )

app.use([ userRoutes, productsRoutes, categoryRoutes ])


module.exports = app;