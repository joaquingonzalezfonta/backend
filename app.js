const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const productsRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const orderRoutes = require('./routes/order.routes')
const provinceRoutes = require('./routes/province.routes')
const budgetRoutes = require('./routes/budget.routes')


app.use( cors() )

app.use(express.static('public'))

app.use( express.json() )

app.use([ userRoutes, productsRoutes, categoryRoutes, orderRoutes, provinceRoutes, budgetRoutes ])


module.exports = app;